const express = require('express');

const postController = require('../controllers/postController');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

// router.get('/', validateJWT, userController.getAll);

router.post('/', validateJWT, postController.create);

router.get('/search', validateJWT, postController.search);

router.put('/:id', validateJWT, postController.update);

router.delete('/:id', validateJWT, postController.deletePost);

router.get('/', validateJWT, postController.getAll);

router.get('/:id', validateJWT, postController.getById);

// router.get('/:id', validateJWT, userController.getById);

module.exports = router;
