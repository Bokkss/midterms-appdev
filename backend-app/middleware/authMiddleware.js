const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];  // Extract the token
    if (!token) return res.status(401).json({ message: 'Access denied, no token provided' });

    try {
        const decoded = jwt.verify(token, 'secretkey');  // Verify the token
        req.user = decoded;  // Attach user info to the request object
        next();  // Proceed to the next middleware
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = { authMiddleware };
