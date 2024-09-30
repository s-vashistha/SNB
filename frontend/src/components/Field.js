import axios from 'axios';
import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import './Field.css';

const Field = () => {
  const [deviceData, setDeviceData] = useState([]);  // State to store the device data
  const [error, setError] = useState(null);          // State for error handling
  const [loading, setLoading] = useState(true);      // Loading state for fetching data
  const [page, setPage] = useState(1);               // Page state for pagination
  const [totalPages, setTotalPages] = useState(1);   // Total number of pages

  useEffect(() => {
    const fetchDeviceData = async () => {
      setLoading(true);  // Start loading
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/data?page=${page}&limit=20`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Ensuring URL-encoded data
          }
        });

        // Handle response as plain form-encoded data
        setDeviceData(response.data.data);  // Populate data
        setTotalPages(response.data.pagination.totalPages);  // Set total pages
        setLoading(false);  // Stop loading when data is fetched
      } catch (error) {
        console.error('Error fetching device data:', error);
        setError('Failed to fetch device data.');
        setLoading(false);  // Stop loading on error
      }
    };

    fetchDeviceData();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <img src={logo} alt="Logo" />
        <h1 align="center" background="#9993">Smart Neckband Devices Data</h1>
      </header>

      {loading && <p>Loading data..</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && deviceData.length > 0 && (
        <div>
          <table>
            <thead>
            <tr>
              <th>Serial No.</th>
              <th>SIMCOM Manufacturing Date</th>
              <th>IMEI Number</th>
              <th>Sim Number</th>
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
              <th>Battery</th>
            </tr>
            </thead>
            <tbody>
              {deviceData.map((device, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{device.SIMCOM_Manufacturing_DATE || 'N/A'}</td>
                  <td>{device.IMEI_Number || 'N/A'}</td>
                  <td>{device.Sim_Number || 'N/A'}</td>
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

          {/* Pagination controls */}
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
          </div>
        </div>
      )}

      {!loading && !error && deviceData.length === 0 && <p>No device data available.</p>}
    </div>
  );
};

export default Field;
