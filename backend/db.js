require('dotenv').config();
const { Sequelize } = require('sequelize');

// Check if DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not defined in the environment variables');
  process.exit(1); // Exit the process if the database URL is missing
}

// Initialize Sequelize with PostgreSQL connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  
  host: 'dpg-crf8pstsvqrc73f5c770-a',
  dialect: 'postgres',
  dialectOptions: {
    ssl: false
  },
  logging: true,// Optional: disable logging of queries
  pool: {                   //check pool attributes
    max:10,
    min: 7,
    acquire: 900000,
    idle: 70000,
    evict: 30000     // Remove idle connections after 30 seconds
  }
});

// Function to ping the database periodically (prevent idle timeouts)
const KEEP_ALIVE_INTERVAL = 30000; // 30 seconds

async function keepAlive() {
  try {
    await sequelize.query('SELECT * FROM espdata'); // A simple query to keep the connection alive
    console.log('Keep-alive query successful');
  } catch (error) {
    console.error('Keep-alive query failed:', error);
  }
}

// Start the keep-alive mechanism
setInterval(keepAlive, KEEP_ALIVE_INTERVAL);

// Persistent retry mechanism for reconnecting on failure
const RETRY_DELAY = 90000000; 


// Function to authenticate and handle reconnections
async function connectWithRetry() {
  while (true) {
    try {
      await sequelize.authenticate();
      console.log('Connection established successfully.');
      break; // Exit loop if connection is successful
    } catch (err) {
      console.error('Unable to connect to the database:', err);
      console.log(`Retrying connection in ${RETRY_DELAY / 900000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY)); // Wait before retrying
    }
  }
}
// Call the function to connect
connectWithRetry();

// Graceful shutdown on process termination
process.on('SIGINT', async () => {
  console.log('Gracefully shutting down...');
  try {
    await sequelize.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error closing database connection:', error);
    process.exit(1);
  }
});;

module.exports = sequelize;

