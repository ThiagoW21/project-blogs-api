const Joi = require('joi');

const userService = require('../services/userService');

const validate = (displayName, email, password) => Joi.object({
  displayName: Joi.string().required().not().empty()
    .min(8),
  email: Joi.string().required().not().empty()
    .email(),
  password: Joi.string().required().not().empty()
    .min(6),
}).validate({ displayName, email, password });

const getAll = async (req, res) => {
  const users = await userService.getAll();

  res.status(200).json(users);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const user = await userService.getById(id);

  if (user.error) return next(user.error);

  return res.status(200).json(user);
};

const create = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const { error } = validate(displayName, email, password);

  if (error) return next(error);

  const token = await userService.create(displayName, email, password, image);

  if (token.error) return next(token.error);

  return res.status(201).json({ token });
};

const deleteMe = async (req, res) => {
  const { id } = req.user;

  await userService.deleteMe(id);

  return res.status(204).end();
};

module.exports = {
  create,
  getById,
  getAll,
  deleteMe,
};
