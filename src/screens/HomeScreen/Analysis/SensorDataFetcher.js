import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios'; // Importing Axios for making HTTP requests
import CustomModal from '../../../utils/CustomModal';
import { getLatestSensorDataUrl } from '../../../apiUtils/apiUrls'; 
// Function to filter labels to reduce clutter on the X-axis
const filterLabels = (labels) => {
  const filteredLabels = [];
  const stepSize = Math.ceil(labels.length / 5); // Adjust step size as needed
  for (let i = 0; i < labels.length; i += stepSize) {
    filteredLabels.push(labels[i]);
  }
  return filteredLabels;
};

const SensorDataFetcher = ({ deviceId }) => {
  const [loading, setLoading] = useState(true);
  const [sensorData, setSensorData] = useState([]);
  const [updateAvailable, setUpdateAvailable] = useState(false); 
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState(0);
  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const url = getLatestSensorDataUrl(deviceId); 
        const response = await axios.get(url, { timeout: 5000 }); // Timeout after 5 seconds
        const data = response.data;

        setSensorData(data);
        setUpdateAvailable(true); 
      } catch (error) {
        console.error('err:', error);
        setSensorData([]); 
        setUpdateAvailable(false); 
      } finally {
        setLoading(false);
      }
    };

    fetchSensorData();
    return () => {};
  }, []);

  const processSensorData = () => {
    if (!Array.isArray(sensorData) || sensorData.length === 0) return { loading, sensorDataSets: null, latestTimestamp: null }; // Return latestTimestamp as null if no data is available
    let latestTimestamp = sensorData[0].timestamp;
    const devices = sensorData.slice(0, 10).sort((a, b) => moment(a.timestamp) - moment(b.timestamp)); // Sorting devices array based on timestamp
    let timestamps = devices.map(device => moment(device.timestamp));
    
    let pHData = devices.map((device, index) => ({
      pH: Math.round(parseFloat(device.tds)),
      time: index % 2 === 1 ? ' ' : moment(device.timestamp).format('HH:mm')
    }));
    
    const orpData = devices.map((device, index) => ({
      orp: Math.round(parseFloat(device.voltage_5)),
      time:moment(device.timestamp).format('HH:mm')
    }));
    
    console.log("orpData",orpData)
    const conductivityData = devices.map((device, index) => ({
      conductivity: Math.round(parseFloat(device.conductivity)),
      time: index % 2 === 1 ? ' ' : moment(device.timestamp).format('HH:mm')
    }));
    
    const formattedLabels = filterLabels(timestamps.map(date => date.format('HH:mm')));

    return {
      loading,
      latestTimestamp,
      sensorDataSets: {
        pHData,
        orpData,
        conductivityData,
      }
    };
  };

  return { ...processSensorData(), updateAvailable }; 
};

export default SensorDataFetcher;
