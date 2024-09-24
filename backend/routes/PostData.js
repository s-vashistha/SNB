const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const EspConst = require('../models/EspConst');

// Parse URL-encoded data
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json()); // Ensure JSON parsing is handled

// POST route for storing device data
router.post('/data', async (req, res) => {
  try {
    // Log the request body to ensure you're getting the right data
    console.log('Received request body:', req.body);

    const {
      SIMCOM_Manufacturing_DATE, IMEI_Number, Sim_Number,
      ESP_Name, ESP_Serial_Number, ESP_ManufacturingDate, Network_Timestamp,
      Body_Temperature, Heart_Rate, SpO2, accX, accY, accZ, gyroX, gyroY, gyroZ,
      Heading, Location, Battery
    } = req.body;

    // Basic validation to check if required fields are provided
    if (!IMEI_Number || !ESP_Serial_Number) {
      return res.status(400).json({ error: 'IMEI_Number and ESP_Serial_Number are required fields.' });
    }

    // Insert into database
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

    // Send success response
    res.json({ message: 'Record processed successfully', device: newRecord });
  } catch (error) {
    // Log the full error and return a 500 status code
    console.error('Error occurred while processing POST /data:', error);
    res.status(500).json({ error: 'An internal server error occurred. Please try again later.' });
  }
});

// GET route to fetch device data
router.get('/data', async (req, res) => {
  try {
    const results = await EspConst.findAll();

    // Format the results with the expected field names
    const modifiedResults = results.map(row => ({
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

    // Return the modified results to the frontend
    res.json(modifiedResults);
  } catch (error) {
    // Log the full error and return a 500 status code
    console.error('Error occurred while processing GET /data:', error);
    res.status(500).json({ error: 'An internal server error occurred. Please try again later.' });
  }
});

module.exports = router;
