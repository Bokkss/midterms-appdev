const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Authorization header:', authHeader);  // Log the Authorization header for debugging

    // Ensure the token starts with "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('No token found or incorrect format');
        return res.status(401).json({ message: 'Access denied, no token provided or wrong format' });
    }

    const token = authHeader.split(' ')[1];  // Extract the token after "Bearer "
    console.log('Extracted token:', token);  // Log the token

    try {
        const decoded = jwt.verify(token, 'secretkey');  // Verify the token with your secret key
        console.log('Decoded token:', decoded);  // Log the decoded token
        req.user = decoded;  // Attach the decoded user information to req.user
        next();  // Continue to the next middleware or controller
    } catch (error) {
        console.error('Error decoding token:', error.message);  // Log any error
        return res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = { authMiddleware };
