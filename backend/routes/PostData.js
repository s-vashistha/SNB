require('dotenv').config();

const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Setup PostgreSQL connection using the Pool from pg
const pool = new Pool({
    connectionString: "postgresql://snbpostdata_user:m64gJ3y7LlYgIXUPV5syQA6OKAR7gXVi@dpg-crf8pstsvqrc73f5c770-a.oregon-postgres.render.com/snbpostdata",
    ssl: {
      rejectUnauthorized: false,  // Necessary for Render-managed Postgres
    },
});

// GET request to fetch device data
router.get('/devices', async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM espdata');
    res.json(results.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// POST route for device data
router.post('/PostData', async (req, res) => {
  const {
    IMEI_Number, System_Date_Time, Sim_Number, SIMCOM_Manufacturing_DATE,
    ESP_Name, ESP_Serial_Number, ESP_ManufacturingDate, Network_Timestamp,
    Body_Temperature, Heart_Rate, SpO2, accX, accY, accZ, gyroX, gyroY, gyroZ,
    Heading, Location, Battery, Device_Status
  } = req.body;  // Data is automatically parsed from application/x-www-form-urlencoded

  // Assuming the 'status' is determined by the 'Device_Status' field in the form
  const status = Device_Status === 'On' ? 'On' : 'Off';

  try {
    // Check if there's an existing record for this ESP_Serial_Number
    const existingRecord = await pool.query(
      `SELECT * FROM espdata WHERE ESP_Serial_Number = $1 ORDER BY SrNo DESC LIMIT 1`,
      [ESP_Serial_Number]
    );

    let query = '';
    let params = [];

    if (existingRecord.rows.length > 0) {
      const lastRecord = existingRecord.rows[0];

      // If the status is 'On', insert a new record; otherwise, update the status
      if (status === 'On') {
        query = `INSERT INTO espdata (IMEI_Number, System_Date_Time, Sim_Number, SIMCOM_Manufacturing_DATE, ESP_Name, ESP_Serial_Number, ESP_ManufacturingDate, Network_Timestamp, Body_Temperature, Heart_Rate, SpO2, accX, accY, accZ, gyroX, gyroY, gyroZ, Heading, Location, Battery, Device_Status) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)`;
        params = [
          IMEI_Number, System_Date_Time, Sim_Number, SIMCOM_Manufacturing_DATE,
          ESP_Name, ESP_Serial_Number, ESP_ManufacturingDate, Network_Timestamp,
          Body_Temperature, Heart_Rate, SpO2, accX, accY, accZ, gyroX, gyroY, gyroZ,
          Heading, Location, Battery, status
        ];
      } else {
        // Update the last record if the status is 'Off'
        query = `UPDATE espdata SET System_Date_Time = $1, Device_Status = $2 WHERE ESP_Serial_Number = $3 AND SrNo = $4`;
        params = [System_Date_Time, status, ESP_Serial_Number, lastRecord.srno];
      }

    } else {
      // If no existing record, insert a new one
      query = `INSERT INTO espdata (IMEI_Number, System_Date_Time, Sim_Number, SIMCOM_Manufacturing_DATE, ESP_Name, ESP_Serial_Number, ESP_ManufacturingDate, Network_Timestamp, Body_Temperature, Heart_Rate, SpO2, accX, accY, accZ, gyroX, gyroY, gyroZ, Heading, Location, Battery, Device_Status) 
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)`;
      params = [
        IMEI_Number, System_Date_Time, Sim_Number, SIMCOM_Manufacturing_DATE,
        ESP_Name, ESP_Serial_Number, ESP_ManufacturingDate, Network_Timestamp,
        Body_Temperature, Heart_Rate, SpO2, accX, accY, accZ, gyroX, gyroY, gyroZ,
        Heading, Location, Battery, status
      ];
    }

    // Execute the query
    await pool.query(query, params);
    res.json({ message: 'Record processed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
