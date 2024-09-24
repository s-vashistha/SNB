const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Import the Sequelize instance from db.js

const EspConst = sequelize.define('EspConst', {
  serialno: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  simcom_manufacturing_date: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  imei_number: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  sim_number: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  esp_name: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  esp_serial_number: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  esp_manufacturingdate: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  network_timestamp: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  body_temperature: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  heart_rate: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  spo2: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  accx: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  accy: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  accz: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  gyrox: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  gyroy: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  gyroz: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  heading: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  location: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  battery: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  tableName: 'espdata',
  timestamps: false
});

module.exports = EspConst;
