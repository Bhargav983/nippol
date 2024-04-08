import React, { useEffect, useState } from 'react';
import { getLatestSensorDataByUrl } from '../../../apiUtils/apiUrls';

const LatestSensorDataFetcher = ({ deviceId }) => {
  const [loading, setLoading] = useState(true);
  const [sensorValues, setSensorValues] = useState({ pH: '', temperature: '', orp: '', timestamp: '' });

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch(getLatestSensorDataByUrl(deviceId));
        const data = await response.json();

        if (data && data.length > 0) {
          const latestReading = data[0];
          setSensorValues({
            pH: latestReading.tds,
            temperature: latestReading.temp,
            orp: latestReading.conductivity,
            timestamp: latestReading.timestamp,
          });
        }
      } catch (error) {
        console.error('Failed to fetch sensor data:', error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchSensorData();
  }, [deviceId]);

  return { loading, ...sensorValues };
};

export default LatestSensorDataFetcher;
