require('dotenv').config();
const { Sequelize } = require('sequelize');

// Initialize Sequelize with PostgreSQL connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // SSL settings for Render
    }
  },
  logging: false // Optional: disable logging of queries
});

module.exports = sequelize;



/*require('dotenv').config();


// Setup PostgreSQL connection using the Pool from pg
const { Pool } = require('pg');

// Set up the connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // PostgreSQL connection URL
  ssl: {
    rejectUnauthorized: false // Required if using a service like Render with SSL enabled
  }
});

// Export the pool object so other files can use it
module.exports = pool;
*/