const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');  // Import the user routes

const app = express();

// Middleware
app.use(bodyParser.json());  // Parse JSON requests

// User routes
app.use('/api/users', userRoutes);  // Use the routes defined in the user file

// Default route to ensure server is running
app.get('/', (req, res) => {
    res.send('API works!!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
