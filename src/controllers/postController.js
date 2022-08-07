const Joi = require('joi');

const postService = require('../services/postService');

const validate = (categoryIds) => Joi.object({
  categoryIds: Joi.number().required(),
}).validate({ categoryIds });

// const getAll = async (req, res) => {
//   const users = await userService.getAll();

//   res.status(200).json(users);
// };

// const getById = async (req, res, next) => {
//   const { id } = req.params;

//   const user = await userService.getById(id);

//   if (user.error) return next(user.error);

//   return res.status(200).json(user);
// };

const validateBody = (title, content, categoryIds) => title && content && categoryIds;

const create = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  
  const { id } = req.user;

  if (!validateBody(title, content, categoryIds)) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  
  const { error } = validate(categoryIds[0]);
  
  if (error) return next(error);

  const post = await postService.create(id, title, content, categoryIds);

  if (post.error) return next(post.error);

  return res.status(201).json(post);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const post = await postService.getById(id);

  if (post.error) return next(post.error);

  return res.status(200).json(post);
};

const getAll = async (req, res) => {
  const blogposts = await postService.getAll();

  return res.status(200).json(blogposts);
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const post = await postService.getById(id);

  if (post.error) return next(post.error);

  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const blogposts = await postService.update(id, title, content, req.user.id);

  if (blogposts.error) return next(blogposts.error);

  return res.status(200).json(blogposts);
};

const deletePost = async (req, res, next) => {
  const { id } = req.params;

  const post = await postService.getById(id);

  if (post.error) return next(post.error);

  const postDeleted = await postService.deletePost(id, req.user.id);

  if (postDeleted.error) return next(postDeleted.error);

  return res.status(204).end();
};

const search = async (req, res) => {
  const { q } = req.query;
  console.log(req.user.id);

  if (!q) {
    const blogposts = await postService.getAll();

    return res.status(200).json(blogposts);
  } 

  const postsByTerm = await postService.search(`%${q}`);

  return res.status(200).json(postsByTerm);
};

module.exports = {
  create,
  getById,
  getAll,
  update,
  deletePost,
  search,
};
