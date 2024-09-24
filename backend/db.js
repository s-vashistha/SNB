// require('dotenv').config();
// const { Sequelize } = require('sequelize');

// // Check if DATABASE_URL is defined
// if (!process.env.DATABASE_URL) {
//   console.error('DATABASE_URL is not defined in the environment variables');
//   process.exit(1); // Exit the process if the database URL is missing
// }

// // Initialize Sequelize with PostgreSQL connection
// const sequelize = new Sequelize(process.env.DATABASE_URL,  {
//   host: process.env.DB_HOST,
//   dialect: 'postgres',
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false // Disable self-signed cert rejection
//     }
//   },
//   logging: true, // Optional: disable logging of queries
//   pool: {
//     max: 10,
//     min: 7,
//     acquire: 900000,
//     idle: 70000,
//   }
// });

// // Function to connect to the database with retries
// const connectWithRetry = async (retries = 7, delay = 7000) => {
//   while (retries) {
//     try {
//       await sequelize.authenticate();
//       console.log('Connection established successfully.');
//       return; // Exit if connection is successful
//     } catch (err) {
//       console.error(`Unable to connect to the database. Retries left: ${retries - 1}`);
//       retries -= 1;

//       if (retries === 0) {
//         console.error('All retries exhausted. Could not connect to the database.');
//         throw err; // Throw the error if all retries are exhausted
//       }

//       // Wait for the specified delay before retrying
//       await new Promise(resolve => setTimeout(resolve, delay));
//     }
//   }
// };

// // Start the connection process without blocking the app
// connectWithRetry().catch(error => {
//   console.error('Could not establish a database connection:', error);
// });

// // Graceful shutdown handling (if you need to clean up other resources)
// process.on('SIGINT', () => {
//   console.log('Received SIGINT, but will not close the database connection.');
//   process.exit(0); // Exit the process without closing the connection
// });

// module.exports = sequelize;

require('dotenv').config();
const { Sequelize } = require('sequelize');

// Check if DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not defined in the environment variables');
  process.exit(1); // Exit the process if the database URL is missing
}

// Initialize Sequelize with PostgreSQL connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // This disables SSL verification for self-signed certificates
    }
  },
  logging: console.log, // Enable detailed logging of all Sequelize queries for debugging
  pool: {
    max: 10,  // Maximum number of connections in the pool
    min: 7,   // Minimum number of connections in the pool
    acquire: 900000,  // Maximum time in ms Sequelize will try to get a connection before throwing an error
    idle: 70000,      // Time in ms a connection can be idle before being released
  }
});

// Function to connect to the database with retries
const connectWithRetry = async (retries = 7, delay = 7000) => {
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log('Database connection established successfully.');
      return; // Exit if connection is successful
    } catch (err) {
      console.error(`Unable to connect to the database. Retries left: ${retries - 1}`, err.message);
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
  console.error('Could not establish a database connection:', error.message);
  process.exit(1); // Exit the application if the connection fails completely
});

// Graceful shutdown handling (if you need to clean up other resources)
process.on('SIGINT', () => {
  console.log('Received SIGINT (Ctrl+C), but will not close the database connection.');
  process.exit(0); // Exit the process without closing the connection
});

module.exports = sequelize;
