require('dotenv').config();
const express = require('express');
const cors = require('cors');
const postDataRoutes = require('./routes/PostData');

// Initialize the app
const app = express();

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));  // This handles application/x-www-form-urlencoded
app.use(cors());  // Enable CORS for cross-origin requests

// Routes
app.use('/', postDataRoutes);  // Use the routes defined in PostData.js

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
