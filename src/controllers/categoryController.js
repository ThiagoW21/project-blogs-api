const Joi = require('joi');

const categoryService = require('../services/categoryService');

const validate = (name) => Joi.object({
  name: Joi.string().required().not().empty(),
}).validate({ name });

const getAll = async (_req, res) => {
  const users = await categoryService.getAll();

  return res.status(200).json(users);
};

const create = async (req, res, next) => {
  const { name } = req.body;

  const { error } = validate(name);

  if (error) return next(error);

  const categoryCreated = await categoryService.create(name);

  return res.status(201).json(categoryCreated);
};

module.exports = {
  create,
  getAll,
};
