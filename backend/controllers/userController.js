const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Create JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};




// Register User (Restricted to superadmin only)
const registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ username, password, role });
    res.status(201).json({ id: user.id, username: user.username, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete User (Restricted to superadmin only)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.remove();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit User (Restricted to superadmin or self-edit)
const editUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Allow superadmin to edit any user or user to edit their own data
    if (req.user.role === 'superadmin' || req.user.id === user.id) {
      user.username = username || user.username;
      user.role = req.user.role === 'superadmin' ? role : user.role;

      if (password) {
        user.password = password;
      }

      const updatedUser = await user.save();
      res.status(200).json({ id: updatedUser.id, username: updatedUser.username, role: updatedUser.role });
    } else {
      res.status(403).json({ message: 'You do not have permission to edit this user' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser,  deleteUser, editUser };