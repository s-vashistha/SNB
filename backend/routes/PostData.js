const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const EspConst = require('../models/EspConst');

// Parse URL-encoded data
router.use(bodyParser.urlencoded({ extended: true }));

// POST route for storing device data
router.post('/data', async (req, res) => {
  console.log(req.body); // Debugging line to check incoming request body
  const {
    SIMCOM_Manufacturing_DATE,IMEI_Number, Sim_Number,
    ESP_Name, ESP_Serial_Number, ESP_ManufacturingDate, Network_Timestamp,
    Body_Temperature, Heart_Rate, SpO2, accX, accY, accZ, gyroX, gyroY, gyroZ,
    Heading, Location, Battery
  } = req.body;

  try {
    const newRecord = await EspConst.create({
      simcom_manufacturing_date: SIMCOM_Manufacturing_DATE,
      imei_number: IMEI_Number,                        
      sim_number: Sim_Number,                           
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
      battery: Battery                                
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
      SIMCOM_Manufacturing_DATE: row.simcom_manufacturing_date,
      IMEI_Number: row.imei_number,                         // Map imei_number to IMEI_Number
      Sim_Number: row.sim_number,                           // Map sim_number to Sim_Number
      ESP_Name: row.esp_name,                               // Map esp_name to ESP_Name
      ESP_Serial_Number: row.esp_serial_number,             // Map esp_serial_number to ESP_Serial_Number
      ESP_ManufacturingDate: row.esp_manufacturingdate,     // Map esp_manufacturingdate to ESP_ManufacturingDate
      Network_Timestamp: row.network_timestamp,             // Map network_timestamp to Network_Timestamp
      Body_Temperature: row.body_temperature,               // Map body_temperature to Body_Temperature
      Heart_Rate: row.heart_rate,                           // Map heart_rate to Heart_Rate
      SpO2: row.spo2,                                       // Map spo2 to SpO2
      accX: row.accx,                                       // Map accx to accX
      accY: row.accy,                                       // Map accy to accY
      accZ: row.accz,                                       // Map accz to accZ
      gyroX: row.gyrox,                                     // Map gyrox to gyroX
      gyroY: row.gyroy,                                     // Map gyroy to gyroY
      gyroZ: row.gyroz,                                     // Map gyroz to gyroZ
      Heading: row.heading,                                 // Map heading to Heading
      Location: row.location,                               // Map location to Location
      Battery: row.battery                                  // Map battery to Battery
    }));

    res.json(modifiedResults); // Return the modified results to the frontend
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
