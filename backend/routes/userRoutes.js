// const express = require('express');
// const { registerUser, loginUser, deleteUser, editUser, logOut, Me } = require('../controllers/userController');
// const { protect, superAdminOnly } = require('../middlewares/authMiddleware');
// const router = express.Router();

// // Register user (superadmin only)
// router.post('/register', protect, superAdminOnly, registerUser);

// // Delete user (superadmin only)
// router.delete('/:id', protect, superAdminOnly, deleteUser);

// // Edit user (superadmin or self-edit)
// router.put('/:id', protect, editUser);

// router.post('/login', loginUser);
// router.delete('/logout', logOut);
// router.get('/me', Me);

// module.exports = router;

// routes/userRoute.js
const express = require('express');
const { registerUser, deleteUser, editUser } = require('../controllers/userController');
const { verifyUser, superAdminOnly } = require('../middlewares/authMiddleware');
const router = express.Router();

// Register user (superadmin only)
router.post('/register', verifyUser, superAdminOnly, registerUser);

// Delete user (superadmin only)
router.delete('/:id', verifyUser, superAdminOnly, deleteUser);

// Edit user (superadmin or self-edit)
router.put('/:id', verifyUser, editUser);

module.exports = router;