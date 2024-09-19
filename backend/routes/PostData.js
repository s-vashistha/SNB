require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const postDataRoutes = require('./routes/PostData');
const sequelize = require('./db');  // Import sequelize instance

// Initialize the app
const app = express();

// Middleware to parse URL-encoded data and JSON data
app.use(express.urlencoded({ extended: true }));  // Handles application/x-www-form-urlencoded
app.use(express.json());  // Handles application/json
app.use(cors());  // Adjust for production URLs when deployed

// Routes
app.use('/api', postDataRoutes);

// Serve static files from the React app
const buildPath = path.join(__dirname, '..', 'frontend', 'build');

// Check if the build directory exists before using it
const fs = require('fs');
if (fs.existsSync(buildPath)) {
  console.log("Serving static files from build path:", buildPath);
  app.use(express.static(buildPath));

  // Serve the React app for any unknown routes (SPA behavior)
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
} else {
  console.error("Error: Frontend build directory not found at:", buildPath);
}

// Start the server after syncing Sequelize models
const PORT = process.env.PORT || 10000;

// Sync Sequelize models with the database
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error("Unable to sync Sequelize models:", error);
});
