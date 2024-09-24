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
    allowNull: false
  },
  imei_number: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  sim_number: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  esp_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  esp_serial_number: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  esp_manufacturingdate: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  network_timestamp: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  body_temperature: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  heart_rate: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  spo2: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  accx: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  accy: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  accz: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  gyrox: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  gyroy: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  gyroz: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  heading: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  location: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  battery: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'espdata',
  timestamps: false
});

module.exports = EspConst;
