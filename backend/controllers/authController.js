// authController.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Login
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ msg: 'User tidak ditemukan' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Password salah' });

    req.session.userId = user.id;
    const token = generateToken(user.id);
    res.status(200).json({ id: user.id, username: user.username, role: user.role, token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Me
const me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: 'Mohon login ke akun Anda!' });
  }
  try {
    const user = await User.findById(req.session.userId).select('-password');
    if (!user) return res.status(404).json({ msg: 'User tidak ditemukan' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Logout
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: 'Tidak dapat logout' });
    res.status(200).json({ msg: 'Anda telah logout' });
  });
};

module.exports = { login, me, logout };