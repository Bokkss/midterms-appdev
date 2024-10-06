const jwt = require('jsonwebtoken');
const users = require('../models/userModel');

// Register new user
const registerUser = (req, res) => {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create and store new user
    const newUser = { id: users.length + 1, username, email, password };
    users.push(newUser);  // Save to mock database
    res.status(201).json({ message: 'User registered successfully' });
};

// Log in user and return token
const loginUser = (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
};

// Get user profile (protected route)
const getUserProfile = (req, res) => {
    console.log('req.user:', req.user);  // Check if req.user is populated

    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    const user = users.find(user => user.id === req.user.id);  // Match user by ID

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json({ id: user.id, username: user.username, email: user.email });
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile
};
