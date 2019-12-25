const express = require('express');
const router = express.Router();

const register = require('./registration');
const role = require('./role');
const login = require('./login');

router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Welcome To Simple API - In Development - By Hady Eka Saputra' })
})

router.use('/register',register);
router.use('/login', login);
router.use('/role', role);

module.exports = router;