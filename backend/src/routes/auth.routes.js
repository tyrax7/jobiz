const express = require('express');

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const loginRateLimit = require('../middlewares/login-rate-limit.middleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', loginRateLimit, authController.login);
router.get('/me', authMiddleware, authController.me);

module.exports = router;