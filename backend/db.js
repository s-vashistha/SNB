require('dotenv').config();
const { Sequelize } = require('sequelize');

// Check if DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not defined in the environment variables');
  process.exit(1); // Exit the process if the database URL is missing
}

// Configure SSL settings conditionally (useful if you want to have different environments)
const useSSL = process.env.NODE_ENV === 'production';

// Initialize Sequelize with PostgreSQL connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: useSSL
      ? {
          require: true,  // Use SSL in production
          rejectUnauthorized: true // Disable self-signed cert rejection (can be updated based on your certificate)
        }
      : false  // No SSL for development or non-production environments
  },
  logging: process.env.NODE_ENV === 'development', // Disable logging in production for performance
  pool: {
    max: 15, // Maximum number of connections increased for better concurrency
    min: 10,  // Minimum number of connections available at all times
    acquire: 5000,  // Max time (in ms) Sequelize will try to get a connection before throwing error
    idle: 30000,  // Time (in ms) before an idle connection is released
  }
});

// Function to connect to the database with retries
const connectWithRetry = async (retries = 7, delay = 7000) => {
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log('Connection established successfully.');
      return; // Exit if connection is successful
    } catch (err) {
      console.error(`Unable to connect to the database. Retries left: ${retries - 1}`);
      retries -= 1;

      if (retries === 0) {
        console.error('All retries exhausted. Could not connect to the database.');
        throw err; // Throw the error if all retries are exhausted
      }

      // Wait for the specified delay before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// Start the connection process without blocking the app
connectWithRetry().catch(error => {
  console.error('Could not establish a database connection:', error);
});

// Graceful shutdown handling (if you need to clean up other resources)
process.on('SIGINT', () => {
  console.log('Received SIGINT, but will not close the database connection.');
  process.exit(0); // Exit the process without closing the connection
});

module.exports = sequelize;
