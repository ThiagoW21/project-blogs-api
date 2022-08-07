const express = require('express');

const userController = require('../controllers/userController');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.get('/', validateJWT, userController.getAll);

router.post('/', userController.create);

router.delete('/me', validateJWT, userController.deleteMe);

router.get('/:id', validateJWT, userController.getById);

module.exports = router;
