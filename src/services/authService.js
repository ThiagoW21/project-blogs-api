const singJWT = require('../auth/signJWT');

const { User } = require('../database/models');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });

  if (!user) {
    return {
      error: {
        code: 'invalidData',
        message: 'Invalid fields',
      },
    };
  }

  return singJWT({ email: user.email, password: user.password });
};

module.exports = { login };
