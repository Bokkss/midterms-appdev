const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, 'secretkey');  
        req.user = decoded;  // Attach the decoded user information to req.user
        next();  // Move to the next middleware or controller
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = { authMiddleware };
