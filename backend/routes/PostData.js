const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const EspConst = require('../models/EspConst');

// Parse URL-encoded data
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// POST route for storing device data
router.post('/data', async (req, res) => {
  console.log(req.body);// Debugging line to check incoming request body
  const {
    IMEI_Number, Sim_Number, SIMCOM_Manufacturing_Date,
    ESP_Name, ESP_Serial_Number, ESP_ManufacturingDate, Network_Timestamp,
    Body_Temperature, Heart_Rate, SpO2, accX, accY, accZ, gyroX, gyroY, gyroZ,
    Heading, Location, Battery
  } = req.body;

  try {
    const newRecord = await EspConst.create({
      imei_number: IMEI_Number,
      //system_date_time: System_Date_Time,
      sim_number: Sim_Number,
      simcom_manufacturing_date: SIMCOM_Manufacturing_Date,
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
      location: Location,
      battery: Battery, // Removed Body_Activity, Jaw_Movement, At_Ideal_Temperature
    });

    res.json({ message: 'Record processed successfully', device: newRecord });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET route to fetch device data
router.get('/data', async (req, res) => {
  
  try {
    const results = await EspConst.findAll();
    const modifiedResults = results.map(row => ({
      IMEI_Number: row.imei_number,
      //System_Date_Time: row.system_date_time,//remove
      Sim_Number: row.sim_number,
      SIMCOM_Manufacturing_Date: row.simcom_manufacturing_date,
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
      Battery: row.battery,
    }));

    res.json(modifiedResults);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
