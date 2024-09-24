import axios from 'axios'; 
import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import './Field.css';

const Field = () => {
  const [deviceData, setDeviceData] = useState([]);  // State to store the device data
  const [error, setError] = useState(null);          // State for error handling
  const [loading, setLoading] = useState(true);      // Loading state for fetching data

  // useEffect to fetch the device data when the component is mounted
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/data`)  // Assuming the API is available at this endpoint
      .then((response) => {
        setDeviceData(response.data);
        setLoading(false);  // Data fetched, loading is done
      })
      .catch((error) => {
        console.error('Error fetching device data:', error);
        setError('Failed to fetch device data.');  // User-friendly error message
        setLoading(false);  // Stop loading even if there is an error
      });
  }, []);

  return (
    <div className="container">
      <header className="header">
        <img src={logo} alt="Logo" />
        <h1 align="center" background="#cdece8">Smart Neckband Devices Data</h1>
      </header>

      {/* Display a loading message while data is being fetched */}
      {loading && <p>Loading data...</p>}

      {/* Display an error message if the data fetch fails */}
      {error && <p className="error-message">{error}</p>}

      {/* Display the device data table if data exists and is not empty */}
      {!loading && !error && deviceData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>IMEI_Number</th>
              {/*<th>System Date Time</th>*/}
              <th>Sim_Number</th>
              <th>SIMCOM_Manufacturing_Date</th>
              <th>ESP_Name</th>
              <th>ESP_Serial_Number</th>
              <th>ESP_ManufacturingDate</th>
              <th>Network_Timestamp</th>
              <th>Body_Temperature</th>
              <th>Heart_Rate</th>
              <th>SpO2</th>
              <th>accX</th>
              <th>accY</th>
              <th>accZ</th>
              <th>gyroX</th>
              <th>gyroY</th>
              <th>gyroZ</th>
              <th>Heading</th>
              <th>Location</th>
              <th>Battery</th>{/* removed Body Activity Jaw Movement At Ideal Temperature*/}
            </tr>
          </thead>
          <tbody>
            {deviceData.map((device, index) => (
              <tr key={device.srno}>
                <td>{index + 1}</td> {/* Serial number based on array index */}
                <td>{device.IMEI_Number || 'N/A'}</td>
                {/*<td>{device.system_date_time || 'N/A'}</td> */}
                <td>{device.Sim_Number || 'N/A'}</td>
                <td>{device.SIMCOM_Manufacturing_Date || 'N/A'}</td>
                <td>{device.ESP_Name || 'N/A'}</td>
                <td>{device.ESP_Serial_Number || 'N/A'}</td>
                <td>{device.ESP_ManufacturingDate || 'N/A'}</td>
                <td>{device.Network_Timestamp || 'N/A'}</td>
                <td>{device.Body_Temperature || 'N/A'}</td>
                <td>{device.Heart_Rate || 'N/A'}</td>
                <td>{device.SpO2 || 'N/A'}</td>
                <td>{device.accX || 'N/A'}</td>
                <td>{device.accY || 'N/A'}</td>
                <td>{device.accZ || 'N/A'}</td>
                <td>{device.gyroX || 'N/A'}</td>
                <td>{device.gyroY || 'N/A'}</td>
                <td>{device.gyroZ || 'N/A'}</td>
                <td>{device.Heading || 'N/A'}</td>
                <td>{device.Location || 'N/A'}</td>
                <td>{device.Battery || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Display message if no data is available */}
      {!loading && !error && deviceData.length === 0 && <p>No device data available.</p>}
    </div>
  );
};

export default Field;