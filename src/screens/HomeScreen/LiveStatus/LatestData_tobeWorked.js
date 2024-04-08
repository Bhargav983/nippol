import React, { useEffect, useState } from 'react';
import { getLatestSensorDataByUrl } from '../../../apiUtils/apiUrls';

const LatestSensorDataFetcher = ({ deviceId }) => {
  const [sensorValues, setSensorValues] = useState({ pH: '', temperature: '', orp: '', timestamp: '' });
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch(getLatestSensorDataByUrl(deviceId));
        const data = await response.json();

        if (data && data.length > 0) {
          const latestReading = data[0]; 
          const newSensorValues = {
            pH: latestReading.tds,
            temperature: latestReading.temp,
            orp: latestReading.conductivity,
            timestamp: latestReading.timestamp, 
          };

          // Check if update is available
          const updateAvailable = newSensorValues.timestamp !== sensorValues.timestamp;
          setUpdateAvailable(updateAvailable);

          setSensorValues(newSensorValues);
        }
      } catch (error) {
        console.error('Failed to fetch sensor data:', error);
      }
    };

    fetchSensorData();
  }, [deviceId]);

  return { ...sensorValues, updateAvailable };
};

export default LatestSensorDataFetcher;
