import axios from 'axios'; // Imported axios
import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import './Field.css'; // Assuming you put your styles in Field.css

const Field = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deviceData, setDeviceData] = useState([]);
  const [postgreData, setPostgreData] = useState([]); // State for PostgreSQL data
  const [formData, setFormData] = useState({
    imei: '',
    bodyTemperature: '',
    heartRate: '',
  }); // State for form data

  useEffect(() => {
    // Fetching device data from your existing Node.js API
    fetch('http://localhost:5000/api/devices')
      .then((res) => res.json())
      .then((data) => setDeviceData(data))
      .catch((error) => console.error('Error fetching device data:', error));

    // Fetching data from PostgreSQL through Axios
    axios
      .get('postgresql://snbpostdata_user:m64gJ3y7LlYgIXUPV5syQA6OKAR7gXVi@dpg-crf8pstsvqrc73f5c770-a.oregon-postgres.render.com/snbpostdata')  // actual URL for PostgreSQL data
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

  // Handle form changes
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert form data to application/x-www-form-urlencoded
    const urlEncodedData = new URLSearchParams();
    for (const [key, value] of Object.entries(formData)) {
      urlEncodedData.append(key, value);
    }

    axios.post(
      'http://localhost:5000/submit', // Your backend endpoint
      urlEncodedData.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    .then((response) => {
      console.log('Form submitted successfully:', response.data);
    })
    .catch((error) => {
      console.error('Error submitting form:', error);
    });
  };

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
            <th>Body Temperature</th>
            <th>Heart Rate</th>
            <th>Battery</th>
            {/* Add other headers as needed */}
          </tr>
        </thead>
        <tbody>
          {filteredDevices.map((device, index) => (
            <tr key={index}>
              <td>{device.IMEI_Number}</td>
              <td>{device.Body_Temperature}</td>
              <td>{device.Heart_Rate}</td>
              <td>{device.Battery}</td>
              {/* Add other data as needed */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Data from PostgreSQL */}
      <h2>Data from Backend </h2>
      <ul>
        {postgreData.map((item) => (
          <li key={item.id}>{item.column_name}</li> // Adjust the field name as necessary
        ))}
      </ul>

      {/* Form for submitting data */}
      <h2>Submit Device Data</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="imei">IMEI Number:</label>
          <input
            type="text"
            name="imei"
            value={formData.imei}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="bodyTemperature">Body Temperature:</label>
          <input
            type="text"
            name="bodyTemperature"
            value={formData.bodyTemperature}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="heartRate">Heart Rate:</label>
          <input
            type="text"
            name="heartRate"
            value={formData.heartRate}
            onChange={handleFormChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Field;
