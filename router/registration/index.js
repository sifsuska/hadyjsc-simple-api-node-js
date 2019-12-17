const express = require('express');
const router = express.Router();
const { UserController } = require('../../controllers');

router.post('/', UserController.register);
router.get('/verify/email/:email/token/:token',  UserController.register_verify);

module.exports = router;