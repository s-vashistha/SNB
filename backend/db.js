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
  logging: false // Optional: disable logging of queries
});

module.exports = sequelize;
