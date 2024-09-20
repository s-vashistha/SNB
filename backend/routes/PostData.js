const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); // Import body-parser for parsing URL-encoded data

// Use bodyParser to handle x-www-form-urlencoded data
router.use(bodyParser.urlencoded({ extended: true }));

const EspConst = require('../models/EspConst'); // Import your Sequelize model

// POST route for device data (accepts x-www-form-urlencoded data)
router.post('/data', async (req, res) => {
  const {
    IMEI_Number, System_Date_Time, Sim_Number, SIMCOM_Manufacturing_DATE,
    ESP_Name, ESP_Serial_Number, ESP_ManufacturingDate, Network_Timestamp,
    Body_Temperature, Heart_Rate, SpO2, accX, accY, accZ, gyroX, gyroY, gyroZ,
    Heading, Body_Activity, Jaw_Movement, At_Ideal_Temperature, Location, Battery
  } = req.body;  // Data is parsed from application/x-www-form-urlencoded

  try {
    // Insert data into the database using Sequelize
    const newRecord = await EspConst.create({
      imei_number: IMEI_Number,
      system_date_time: System_Date_Time,
      sim_number: Sim_Number,
      simcom_manufacturing_date: SIMCOM_Manufacturing_DATE,
      esp_name: ESP_Name,
      esp_serial_number: ESP_Serial_Number,
      esp_manufacturingdate: ESP_ManufacturingDate,
      network_timestamp: Network_Timestamp,
      body_temperature: Body_Temperature,
      heart_rate: Heart_Rate,
      spo2: SpO2,
      accx: accX,
      accy: accY,
      accz: accZ,
      gyrox: gyroX,
      gyroy: gyroY,
      gyroz: gyroZ,
      heading: Heading,
      body_activity: Body_Activity,
      jaw_movement: Jaw_Movement,
      at_ideal_temperature: At_Ideal_Temperature,
      location: Location,
      battery: Battery,
    });

    res.json({ message: 'Record processed successfully', data: newRecord });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET request to fetch device data
router.get('/data', async (req, res) => {
  try {
    // Fetch data from the database
    const results = await EspConst.findAll();

    // Modify the results to match the structure used in your frontend
    const modifiedResults = results.map(row => ({
      IMEI_Number: row.imei_number,
      System_Date_Time: row.system_date_time,
      Sim_Number: row.sim_number,
      SIMCOM_Manufacturing_DATE: row.simcom_manufacturing_date,
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
      Body_Activity: row.body_activity,
      Jaw_Movement: row.jaw_movement,
      At_Ideal_Temperature: row.at_ideal_temperature,
      Location: row.location,
      Battery: row.battery,
    }));

    res.json(modifiedResults);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
