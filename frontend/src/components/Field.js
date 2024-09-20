import axios from 'axios'; 
import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import './Field.css';

const Field = () => {
  const [deviceData, setDeviceData] = useState([]);  // State to store the device data
  const [error, setError] = useState(null);          // State for error handling

  // useEffect to fetch the device data when the component is mounted
  useEffect(() => {
    // Fetch data from the backend using axios
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/data`)  // Assuming the API is available at this endpoint
      .then((response) => {
        // Set the data returned by the backend to the deviceData state
        setDeviceData(response.data);
      })
      .catch((error) => {
        // Handle error by setting the error state
        console.error('Error fetching device data:', error);
        setError('Failed to fetch device data.');  // User-friendly error message
      });
  }, []);

  return (
    <div className="container">
      <header className="header">
        <img src={logo} alt="Logo" />
        <h1 align="center" background="#cdece8">Smart Neckband Devices Data</h1>
      </header>

      {/* Display an error message if the data fetch fails */}
      {error && <p className="error-message">{error}</p>}

      {/* Display the device data table if data exists */}
      <table>
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>IMEI Number</th>
            <th>System Date Time</th>
            <th>Sim Number</th>
            <th>SIMCOM Manufacturing Date</th>
            <th>ESP Name</th>
            <th>ESP Serial Number</th>
            <th>ESP Manufacturing Date</th>
            <th>Network Timestamp</th>
            <th>Body Temperature</th>
            <th>Heart Rate</th>
            <th>SpO2</th>
            <th>accX</th>
            <th>accY</th>
            <th>accZ</th>
            <th>gyroX</th>
            <th>gyroY</th>
            <th>gyroZ</th>
            <th>Heading</th>
            <th>Body Activity</th>
            <th>Jaw Movement</th>
            <th>At Ideal Temperature</th>
            <th>Location</th>
            <th>Battery</th>
            <th>Status</th> {/* Confirm this field exists or remove */}
          </tr>
        </thead>
        <tbody>
          {/* Render the device data */}
          {deviceData.map((device, index) => (
            <tr key={device.srno}>
              <td>{index + 1}</td> {/* Serial number based on array index */}
              <td>{device.imei_number}</td>
              <td>{device.system_date_time}</td>
              <td>{device.sim_number}</td>
              <td>{device.simcom_manufacturing_date}</td>
              <td>{device.esp_name}</td>
              <td>{device.esp_serial_number}</td>
              <td>{device.esp_manufacturingdate}</td>
              <td>{device.network_timestamp}</td>
              <td>{device.body_temperature}</td>
              <td>{device.heart_rate}</td>
              <td>{device.spo2}</td>
              <td>{device.accx}</td>
              <td>{device.accy}</td>
              <td>{device.accz}</td>
              <td>{device.gyrox}</td>
              <td>{device.gyroy}</td>
              <td>{device.gyroz}</td>
              <td>{device.heading}</td>
              <td>{device.body_activity}</td>
              <td>{device.jaw_movement}</td>
              <td>{device.at_ideal_temperature}</td>
              <td>{device.location}</td>
              <td>{device.battery}</td>
              <td>{device.status}</td> {/* Ensure this exists or remove */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Field;
