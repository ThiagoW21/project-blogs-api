const { Op } = require('sequelize');

const { BlogPost, PostCategory, Category, User } = require('../database/models');

const getAll = async () => {
  const blogposts = await BlogPost.findAll({
    attributes: { exclude: ['UserId'] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

  return blogposts;
};

const create = async (userId, title, content, categoryIds) => {
  const categories = await Category.findAll({
    where: {
      id: { [Op.in]: categoryIds },
    },
  });

  if (categories.length !== categoryIds.length) {
    return {
      error: {
        code: 'invalidData',
        message: '"categoryIds" not found',
      },
    };
  }

  const postBlogCreated = await BlogPost.create({ title, content, userId });

  const postCategoriesToInsert = categoryIds
    .map((categoryId) => ({ postId: postBlogCreated.id, categoryId }));

  await PostCategory.bulkCreate(postCategoriesToInsert);

  return postBlogCreated;
};

const getById = async (postId) => {
  const post = await BlogPost.findByPk(postId, {
    attributes: { exclude: ['UserId'] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

  if (!post) {
    return {
      error: {
        code: 'notFound',
        message: 'Post does not exist',
      },
    };
  }

  return { ...post.dataValues };
};

const update = async (id, title, content, userId) => {
  const post = await BlogPost.findOne({ where: { id, userId } });

  if (!post) {
    return {
      error: {
        code: 'unauthorized',
        message: 'Unauthorized user',
      },
    };
  }

  await BlogPost.update({ title, content },
  { where: { id } });

  const postUpdated = await getById(id);

  return postUpdated;
};

const deletePost = async (postId, userId) => {
  const postDeleted = await BlogPost.destroy({ where: { id: postId, userId } });

  if (!postDeleted) {
    return {
      error: {
        code: 'unauthorized',
        message: 'Unauthorized user',
      },
    };
  }

  return postDeleted;
};

const search = async (term) => BlogPost.findAll({
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories' },
  ],
  where: { 
    [Op.or]: [
      { title: { [Op.like]: term } }, 
      { content: { [Op.like]: term } },
    ] },
  });

module.exports = { 
  create,
  getById,
  getAll,
  update,
  deletePost,
  search,
};
