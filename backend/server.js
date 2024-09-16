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
app.use(express.urlencoded({ extended: true }));  // This handles application/x-www-form-urlencoded
app.use(cors({ origin: 'http://localhost:10005' }));  // Enable CORS for cross-origin requests

// Middleware to handle JSON responses
app.use(express.json());

// Routes
app.use('/api/data', postDataRoutes);  // Use the routes defined in PostData.js
// Other middleware and API routes
// e.g., app.use('/api', apiRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Serve the React app for any unknown routes (SPA behavior)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
