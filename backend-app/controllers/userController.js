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

// Login user
const loginUser = (req, res) => {
    const { email, password } = req.body;

    // Validate user credentials
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
};

// Get user profile (requires authentication)
const getUserProfile = (req, res) => {
    const user = users.find(user => user.id === req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile
};
