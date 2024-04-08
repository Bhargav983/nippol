// SensorDataProvider.js
import React, { useState, useEffect, createContext, useContext } from 'react';
import { useDeviceContext} from './DeviceContext'
import moment from 'moment';

const SensorDataContext = createContext();

export const useSensorData = () => useContext(SensorDataContext);

// Function to filter labels to reduce clutter on the X-axis
const filterLabels = (labels) => {
  const filteredLabels = [];
  const stepSize = Math.ceil(labels.length / 5); // Adjust step size as needed
  for (let i = 0; i < labels.length; i += stepSize) {
    filteredLabels.push(labels[i]);
  }
  return filteredLabels;
};

const SensorDataProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [sensorData, setSensorData] = useState([]);
  const { selectedDevice } = useDeviceContext();
  console.log("Inside SensorDataProvider device  ",selectedDevice)
  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const url = `https://nimblevision.io/public/api/getDeviceDiagnosticInfoNisensu?key=chinnu&token=257bbec888a81696529ee979804cca59&device_id=${selectedDevice.device_id}`;
        const response = await fetch(url);
        const data = await response.json();
        setSensorData(data);
      } catch (error) {
        console.error('Failed to fetch sensor data:', error);
        setSensorData([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchSensorData();
    const intervalId = setInterval(fetchSensorData, 600000); // Refresh every 10 minutes
    return () => clearInterval(intervalId);
  }, [selectedDevice.device_id]);

  const processSensorData = () => {
    if (!Array.isArray(sensorData) || sensorData.length === 0) return { loading, sensorDataSets: null };

    const devices = sensorData.slice(0, 10);
    let timestamps = devices.map(device => moment(device.timestamp));
    timestamps.reverse(); // Ensure timestamps are in the correct order

    // Process data for each sensor type
    const pHData = devices.map(device => parseFloat(device.tds));
    const temperatureData = devices.map(device => parseFloat(device.temp));
    const orpData = devices.map(device => parseFloat(device.conductivity));
    // Format timestamps and filter labels
    const formattedLabels = filterLabels(timestamps.map(date => date.format('HH:mm')));

    return {
      loading,
      sensorDataSets: {
        pHData,
        temperatureData,
        orpData,
        labels: formattedLabels // Use filtered labels
      }
    };
  };

  return (
    <SensorDataContext.Provider value={processSensorData()}>
      {children}
    </SensorDataContext.Provider>
  );
};

export default SensorDataProvider;
