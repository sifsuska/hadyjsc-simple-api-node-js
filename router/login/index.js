const express = require('express');
const router = express.Router();
const { UserController } = require('../../controllers');
const { userFindOne } = require('../../middlewares');

router.post('/', userFindOne, UserController.login);
router.post('/verify', userFindOne, UserController.verify);

module.exports = router;