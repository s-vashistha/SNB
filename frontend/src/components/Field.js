import axios from 'axios'; // Imported axios
import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import './Field.css'; // Assuming you put your styles in Field.css

const Field = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deviceData, setDeviceData] = useState([]);
  const [postgreData, setPostgreData] = useState([]); // State for PostgreSQL data

  

  useEffect(() => { 
    // Fetching device data from your existing Node.js API
    fetch(`${process.env.REACT_APP_API_URL}/api/data`)
      .then((res) => res.json())
      .then((data) => setDeviceData(data))
      .catch((error) => console.error('Error fetching device data:', error));

    // Fetching data from PostgreSQL through Axios
    axios
      .get(`${process.env.DATABASE_URL}`)  // actual URL for PostgreSQL data
      .then((response) => {
        setPostgreData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching PostgreSQL data:', error);
      });
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

      {/* Search Bar */}
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
            <th>SerialNo.</th>
            <th>IMEI Number</th>
            <th>System_Date_Time</th>
            <th>Sim_Number</th>
            <th>SIMCOM_Manufacturing_DATE</th> 
            <th>ESP_Name</th> 
            <th>ESP_Serial_Number</th> 
            <th>ESP_ManufacturingDate</th> 
            <th>Network_Timestamp</th>
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
          {filteredDevices.map((data, index) => (
            <tr key={index}> 
              <td>{data.SerialNo}</td>
              <td>{data.imei_number}</td>
              <td>{data.system_date_time}</td>
              <td>{data.sim_number}</td>
              <td>{data.simcom_manufacturing_date}</td>
              <td>{data.esp_name}</td>
              <td>{data.esp_serial_number}</td>
              <td>{data.esp_manufacturing_date}</td>
              <td>{data.network_timestamp}</td>
              <td>{data.body_temperature}</td>
              <td>{data.heart_rate}</td>
              <td>{data.spo2}</td>
              <td>{data.accx}</td>
              <td>{data.accy}</td>
              <td>{data.accz}</td>
              <td>{data.gyrox}</td>
              <td>{data.gyroy}</td>
              <td>{data.gyroz}</td>
              <td>{data.pressure}</td>
              <td>{data.heading}</td>
              <td>{data.location}</td>
              <td>{data.battery}</td>
              {/* Add other data as needed */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Data from PostgreSQL */}
      <h2>Data from Backend </h2>
      <ul>
        {postgreData.map((item) => (
          <li key={item.srno}>
            {item.imei_number},
            {item.system_date_time},{item.simcom_manufacturing_date},{item.esp_name},{item.esp_serial_number},{item.esp_manufacturing_date},
            {item.network_timestamp},{item.body_temperature},{item.heart_rate},{item.spo2},{item.accx},{item.accy},{item.accz},{item.gyrox},{item.gyroy},{item.gyroz},
            {item.pressure},{item.heading},{item.location},{item.battery}
          </li> // Adjust the field name as necessary
        ))}
      </ul>
    </div>
    );
};

export default Field;
