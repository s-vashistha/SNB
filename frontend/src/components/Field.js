import axios from 'axios';
import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import './Field.css';

const Field = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deviceData, setDeviceData] = useState([]);
  const [postgreData, setPostgreData] = useState([]);

  useEffect(() => {
    // Fetch device data from backend
    fetch(`${process.env.REACT_APP_API_URL}/api/data`)
      .then((res) => res.json())
      .then((data) => setDeviceData(data))
      .catch((error) => console.error('Error fetching device data:', error));

    // Fetch PostgreSQL data through backend API
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/data`)
      .then((response) => setPostgreData(response.data))
      .catch((error) => console.error('Error fetching PostgreSQL data:', error));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDevices = deviceData.filter((device) =>
    device.IMEI_Number.includes(searchTerm)
  );

  return (
    <div className="container">
      <header className="header">
        <img src={logo} alt="Logo" />
        <h1>Smart Neckband Devices Data</h1>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by IMEI number..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Devices Table */}
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
            <th>Pressure</th>
            <th>Heading</th>
            <th>Location</th>
            <th>Battery</th>
            <th>Status</th>
          </tr>
      </thead>
      <tbody>
          {filteredDevices.map((device, index) => (
            <tr key={index}>
              <td>{device.srno}</td>
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
              <td>{device.pressure}</td>
              <td>{device.heading}</td>
              <td>{device.location}</td>
              <td>{device.battery}</td>
              <td>{device.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Data from Backend</h2>
      <ul>
        {postgreData.map((item) => (
          <li key={item.srno}>
            {item.imei_number}, {item.system_date_time}, {item.simcom_manufacturing_date},
             {item.esp_name}, {item.esp_serial_number}, {item.esp_manufacturingdate}, {item.network_timestamp},
              {item.body_temperature}, {item.heart_rate}, {item.spo2}, {item.accx}, {item.accy}, {item.accz}, {item.gyrox}, {item.gyroy}, {item.gyroz}, {item.pressure}, {item.heading}, {item.location}, {item.battery}
          </li>
        ))}
      </ul>

    </div>
    );
};

export default Field;
