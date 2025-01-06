// authRoutes.js
const express = require('express');
const { login, me, logout } = require('../controllers/authController');
const { verifyUser } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', login);
router.get('/me', verifyUser, me);
router.post('/logout', logout);

module.exports = router;
