require('dotenv').config();
const { Sequelize } = require('sequelize');
/*const db = mysql.createConnection({
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PASS,
  database:process.env.DB_NAME,
})*/
// Check if DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not defined in the environment variables');
  process.exit(1); // Exit the process if the database URL is missing
}

// Initialize Sequelize with PostgreSQL connection
const sequelize = new Sequelize(process.env.DATABASE_URL,  {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  },
  logging: true, // Optional: disable logging of queries
  pool: {
    max: 10,
    min: 7,
    acquire: 900000,
    idle: 70000,
  }
});

// Function to connect to the database with retries
const connectWithRetry = async (retries = 5, delay = 2000) => {
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

/*db.connect((err)=>{
  if(err) throw err;
  console.log("connect db")
})*/

module.exports = sequelize;
