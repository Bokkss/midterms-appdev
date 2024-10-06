const jwt = require('jsonwebtoken');
const users = require('../models/userModel');

// Register user
const registerUser = (req, res) => {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Create and store new user
    const newUser = { id: users.length + 1, username, email, password };
    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully' });
};

const loginUser = (req, res) => {
    const user = users.find(u => u.email === req.body.email && u.password === req.body.password);
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });  // Include user.id in the token
    res.json({ token });
};

// Get user profile (requires authentication)
const getUserProfile = (req, res) => {
    console.log('req.user:', req.user);  // Log req.user to check if it's defined
    
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    const user = users.find(user => user.id === req.user.id);  // Find user by ID from req.user

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);  // Return the user's profile
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile
};
