const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// POST /register - Register a new user
router.post('/register', registerUser);

// POST /login - Login and get a token
router.post('/login', loginUser);

// GET /profile - Get the profile of the authenticated user (Protected route)
router.get('/profile', getUserProfile);

module.exports = router;  // Export the router for use in app.js
