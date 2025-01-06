const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// // Middleware to check if the user is authenticated
// const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       token = req.headers.authorization.split(' ')[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded.id).select('-password');
//       if (!req.user) {
//         return res.status(401).json({ message: 'Not authorized, user not found' });
//       }

//       next();
//     } catch (error) {
//       res.status(401).json({ message: 'Not authorized, token failed' });
//     }
//   } else {
//     res.status(401).json({ message: 'Not authorized, no token' });
//   }
// };

// Verify User Middleware
const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: 'Mohon login ke akun Anda!' });
  }
  try {
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ msg: 'User tidak ditemukan' });

    req.userId = user.id;
    req.role = user.role;
    next();
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Middleware to restrict access to superadmin role only
const superAdminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'superadmin') {
    next();
  } else {
    res.status(403).json({ message: 'Access restricted to superadmin only' });
  }
};

//module.exports = { protect, superAdminOnly };
module.exports = { verifyUser, superAdminOnly };