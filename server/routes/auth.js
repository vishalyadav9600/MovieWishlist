const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const port =process.env.port || 3500;

router.post('/', authController.handleLogin);

module.exports = router;