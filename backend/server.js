require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const postDataRoutes = require('./routes/PostData'); // Ensure the path is correct
const sequelize = require('./db');  // Import sequelize instance

const app = express();

// Middleware to parse URL-encoded data and JSON data
app.use(express.urlencoded({ extended: true }));  // Handles application/x-www-form-urlencoded
app.use(express.json());  // Handles application/json
app.use(cors({
  origin: '*',
  credentials: true,
}));

// Use the API routes
app.use('/api', postDataRoutes);

// Serve static files from the React app
const buildPath = path.join(__dirname, '../frontend/build');
const fs = require('fs');
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    console.log(req.query);
    res.sendFile(path.join(buildPath, 'index.html'));
  });
} else {
  console.error("Error: Frontend build directory not found at:", buildPath);
}

// Start the server after syncing Sequelize models
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error("Unable to sync Sequelize models:", error); // This logs Sequelize-specific errors
});

