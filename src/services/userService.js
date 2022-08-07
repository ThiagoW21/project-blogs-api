const singJWT = require('../auth/signJWT');

const { User } = require('../database/models');

const getAll = () => User.findAll({ attributes: { exclude: ['password'] } });

const getById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

  if (!user) {
    return {
      error: {
        code: 'notFound',
        message: 'User does not exist',
      },
    };
  }

  return user;
};

const create = async (displayName, email, password, image) => {
  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    return {
      error: {
        code: 'conflict',
        message: 'User already registered',
      },
    };
  }

  await User.create({ displayName, email, password, image });

  return singJWT({ email, password });
}; 

const deleteMe = async (id) => User.destroy({ where: { id } });

module.exports = { 
  create,
  getById,
  getAll,
  deleteMe,
};
