const express = require('express');
const path = require('path');
const apiRoutes = require('./api');

const app = express();

// Middleware to parse JSON and serve static files (your HTML files)
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); 

// Use the API routes
app.use('/api', apiRoutes);

// Default route to check server status
app.get('/status', (req, res) => {
    res.send({ status: 'Server is running', timestamp: new Date() });
});

module.exports = app;