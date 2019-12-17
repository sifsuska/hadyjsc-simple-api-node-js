const express = require('express');
const router = express.Router();
const { RoleController } = require('../../controllers');

router.get('/', RoleController.list);
router.post('/create', RoleController.create);

module.exports = router;