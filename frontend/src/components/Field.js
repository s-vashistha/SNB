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
              <th>Location</th>
              <th>Battery</th>{/* removed Body Activity Jaw Movement At Ideal Temperature*/}
            </tr>
          </thead>
          <tbody>
            {deviceData.map((data, index) => (
              <tr key={data.srno}>
                <td>{index + 1}</td> {/* Serial number based on array index */}
                <td>{data.imei_number || 'N/A'}</td>
                <td>{data.system_date_time || 'N/A'}</td>
                <td>{data.sim_number || 'N/A'}</td>
                <td>{data.simcom_manufacturing_date || 'N/A'}</td>
                <td>{data.esp_name || 'N/A'}</td>
                <td>{data.esp_serial_number || 'N/A'}</td>
                <td>{data.esp_manufacturingdate || 'N/A'}</td>
                <td>{data.network_timestamp || 'N/A'}</td>
                <td>{data.body_temperature || 'N/A'}</td>
                <td>{data.heart_rate || 'N/A'}</td>
                <td>{data.spo2 || 'N/A'}</td>
                <td>{data.accx || 'N/A'}</td>
                <td>{data.accy || 'N/A'}</td>
                <td>{data.accz || 'N/A'}</td>
                <td>{data.gyrox || 'N/A'}</td>
                <td>{data.gyroy || 'N/A'}</td>
                <td>{data.gyroz || 'N/A'}</td>
                <td>{data.heading || 'N/A'}</td>
                <td>{data.location || 'N/A'}</td>
                <td>{data.battery || 'N/A'}</td>
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