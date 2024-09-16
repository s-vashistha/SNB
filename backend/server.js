require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const postDataRoutes = require('./routes/PostData');
const bodyParser = require('body-parser');
const pool = require('./db');

// Initialize the app
const app = express();

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(cors());  // Adjust for production URLs when deployed

// Middleware to handle JSON responses
app.use(express.json());

// Routes
app.use('/api/data', postDataRoutes);

// Serve static files from the React app
const buildPath = path.join(__dirname, 'frontend/build');
app.use(express.static(buildPath));

// Serve the React app for any unknown routes (SPA behavior)
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
