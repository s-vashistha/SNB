const express = require('express');
const router = express.Router();
const EspConst = require('../models/EspConst');

// POST route for storing device data
router.post('/data', async (req, res) => {
  console.log(req.body); // Debugging line to check incoming request body

  // Check if req.body is an array (batch insert), else convert single record into an array
  const data = Array.isArray(req.body) ? req.body : [req.body];

  // Map incoming data to match database columns (whether JSON or URL-encoded)
  const records = data.map(item => ({
    simcom_manufacturing_date: item.SIMCOM_Manufacturing_DATE,
    imei_number: item.IMEI_Number,
    sim_number: item.Sim_Number,
    esp_name: item.ESP_Name,
    esp_serial_number: item.ESP_Serial_Number,
    esp_manufacturingdate: item.ESP_ManufacturingDate,
    network_timestamp: item.Network_Timestamp,
    body_temperature: item.Body_Temperature,
    heart_rate: item.Heart_Rate,
    spo2: item.SpO2,
    accx: item.accX,
    accy: item.accY,
    accz: item.accZ,
    gyrox: item.gyroX,
    gyroy: item.gyroY,
    gyroz: item.gyroZ,
    heading: item.Heading,
    location: item.Location,
    battery: item.Battery
  }));

  try {
    // Insert all records in bulk
    const newRecords = await EspConst.bulkCreate(records);
    res.status(200).json({ message: 'Records added successfully', devices: newRecords });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET route to fetch device data with pagination (optimized for large datasets)
router.get('/data', async (req, res) => {
  const page = parseInt(req.query.page) || 1;  // Current page, default to 1
  const limit = parseInt(req.query.limit) || 20;  // Number of records per page, default to 20
  const offset = (page - 1) * limit;  // Calculate the offset

  try {
    // Fetch data with pagination and sort by the order of insertion using 'serialno'
    const results = await EspConst.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [['serialno', 'ASC']]  // Sort by serialno for insertion order
    });

    // Prepare paginated response
    const totalPages = Math.ceil(results.count / limit);
    const modifiedResults = results.rows.map(row => ({
      SIMCOM_Manufacturing_DATE: row.simcom_manufacturing_date,
      IMEI_Number: row.imei_number,
      Sim_Number: row.sim_number,
      ESP_Name: row.esp_name,
      ESP_Serial_Number: row.esp_serial_number,
      ESP_ManufacturingDate: row.esp_manufacturingdate,
      Network_Timestamp: row.network_timestamp,
      Body_Temperature: row.body_temperature,
      Heart_Rate: row.heart_rate,
      SpO2: row.spo2,
      accX: row.accx,
      accY: row.accy,
      accZ: row.accz,
      gyroX: row.gyrox,
      gyroY: row.gyroy,
      gyroZ: row.gyroz,
      Heading: row.heading,
      Location: row.location,
      Battery: row.battery
    }));

    res.json({
      data: modifiedResults,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalRecords: results.count
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;