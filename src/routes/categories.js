const express = require('express');

const categoryController = require('../controllers/categoryController');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.get('/', validateJWT, categoryController.getAll);

router.post('/', validateJWT, categoryController.create);

module.exports = router;
