require('dotenv').config();
const { Sequelize } = require('sequelize');

// Check if DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not defined in the environment variables');
  process.exit(1); // Exit the process if the database URL is missing
}

// Initialize Sequelize with PostgreSQL connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false // SSL settings for Render
    }
  },
  logging: false,// Optional: disable logging of queries
  pool: {                   //check pool attributes
    max:10,
    min: 7,
    acquire: 50000,
    idle: 70000
  }
});


// Authenticate and handle connection
async function connectWithRetry() {
  try {
    await sequelize.authenticate();
    console.log('Connection established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    setTimeout(connectWithRetry, 1000); // Retry after 1 seconds if it fails
  }
}

// Call the function to connect
connectWithRetry();

module.exports = sequelize;

