// const express = require('express');
// const router = express.Router();
// const bodyParser = require('body-parser');
// const EspConst = require('../models/EspConst');

// // Parse URL-encoded data
// router.use(bodyParser.urlencoded({ extended: true }));

// // POST route for storing device data
// router.post('/data', async (req, res) => {
//   const {
//     IMEI_Number, System_Date_Time, Sim_Number, SIMCOM_Manufacturing_DATE,
//     ESP_Name, ESP_Serial_Number, ESP_ManufacturingDate, Network_Timestamp,
//     Body_Temperature, Heart_Rate, SpO2, accX, accY, accZ, gyroX, gyroY, gyroZ,
//     Heading, Location, Battery
//   } = req.body;

//   try {
//     const newRecord = await EspConst.create({
//       imei_number: IMEI_Number,
//       system_date_time: System_Date_Time,
//       sim_number: Sim_Number,
//       simcom_manufacturing_date: SIMCOM_Manufacturing_DATE,
//       esp_name: ESP_Name,
//       esp_serial_number: ESP_Serial_Number,
//       esp_manufacturingdate: ESP_ManufacturingDate,
//       network_timestamp: Network_Timestamp,
//       body_temperature: Body_Temperature,
//       heart_rate: Heart_Rate,
//       spo2: SpO2,
//       accx: accX,
//       accy: accY,
//       accz: accZ,
//       gyrox: gyroX,
//       gyroy: gyroY,
//       gyroz: gyroZ,
//       heading: Heading,
//       location: Location,
//       battery: Battery, // Removed Body_Activity, Jaw_Movement, At_Ideal_Temperature
//     });

//     res.json({ message: 'Record processed successfully', data: newRecord });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // GET route to fetch device data
// router.get('/data', async (req, res) => {
//   try {
//     const results = await EspConst.findAll();
//     const modifiedResults = results.map(row => ({
//       IMEI_Number: row.imei_number,
//       System_Date_Time: row.system_date_time,//remove
//       Sim_Number: row.sim_number,
//       SIMCOM_Manufacturing_DATE: row.simcom_manufacturing_date,
//       ESP_Name: row.esp_name,
//       ESP_Serial_Number: row.esp_serial_number,
//       ESP_ManufacturingDate: row.esp_manufacturingdate,
//       Network_Timestamp: row.network_timestamp,
//       Body_Temperature: row.body_temperature,
//       Heart_Rate: row.heart_rate,
//       SpO2: row.spo2,
//       accX: row.accx,
//       accY: row.accy,
//       accZ: row.accz,
//       gyroX: row.gyrox,
//       gyroY: row.gyroy,
//       gyroZ: row.gyroz,
//       Heading: row.heading,
//       Location: row.location,
//       Battery: row.battery,
//     }));

//     res.json(modifiedResults);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const EspConst = require('../models/EspConst');

// Parse URL-encoded data
router.use(bodyParser.urlencoded({ extended: true })); // Assuming form-data is sent

// POST route for storing device data
router.post('/data', async (req, res) => {
  // Log the request body to debug if you are getting the data as expected
  console.log(req.body); 

  // Destructure the data from req.body
  const {
    IMEI_Number, System_Date_Time, Sim_Number, SIMCOM_Manufacturing_DATE,
    ESP_Name, ESP_Serial_Number, ESP_ManufacturingDate, Network_Timestamp,
    Body_Temperature, Heart_Rate, SpO2, accX, accY, accZ, gyroX, gyroY, gyroZ,
    Heading, Location, Battery
  } = req.body;

  try {
    // Ensure all the required fields are sent in the correct format
    if (!IMEI_Number || !ESP_Serial_Number || !System_Date_Time) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a new record using the model
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
      location: Location,
      battery: Battery,
    });

    // Return a success message along with the newly created record
    res.json({ message: 'Record processed successfully', data: newRecord });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET route to fetch device data
router.get('/data', async (req, res) => {
  try {
    // Fetch all the data from the database
    const results = await EspConst.findAll();

    // Transform the data to the expected output format
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
      Location: row.location,
      Battery: row.battery,
    }));

    // Send the transformed data in the response
    res.json(modifiedResults);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
