const { Category } = require('../database/models');

const getAll = async () => Category.findAll();

const create = async (name) => {
  const categoryCreated = await Category.create({ name });

  return categoryCreated;
};

module.exports = { 
  create,
  getAll,
};
