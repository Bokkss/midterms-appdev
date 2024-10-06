const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    console.log('Request headers:', req.headers);

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.log('No Authorization header found');
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    if (!authHeader.startsWith('Bearer ')) {
        console.log('Authorization header is in the wrong format');
        return res.status(401).json({ message: 'Invalid token format' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Extracted Token:', token);

    try {
        const decoded = jwt.verify(token, 'secretkey');
        console.log('Decoded Token:', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { authMiddleware };
