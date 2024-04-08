import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDeviceContext } from '../../../context/DeviceContext';
import { useEllipsisOptions } from '../../../context/EllipsisContext';
import { useIsFocused } from '@react-navigation/native'; // Importing useIsFocused hook
import styles from './LiveStatusStyles';
import axios from 'axios'; // Importing Axios for making HTTP requests
import showToastInCenter from '../../../utils/CenterToast';
import { getLatestSensorDataByUrl } from '../../../apiUtils/apiUrls';
const Live = ({ navigation }) => {
  const { selectedDevice } = useDeviceContext();
  const { hideEllipsisOptions } = useEllipsisOptions();
  const isFocused = useIsFocused(); // Using useIsFocused hook

  const [sensorValues, setSensorValues] = useState({ pH: '', temperature: '', orp: '', timestamp: '', loading: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(getLatestSensorDataByUrl(selectedDevice.device_id));
        const data = await response.json();

        if (data && data.length > 0) {
          const latestReading = data[0];
          setSensorValues({
            pH: latestReading.tds,
            temperature: latestReading.temp,
            orp: latestReading.conductivity,
            timestamp: latestReading.timestamp,
            loading:false
          });
        }

      } catch (error) {
        console.error('Failed to fetch sensor data:', error);
        setSensorValues({ pH: '', temperature: '', orp: '', timestamp: '', loading: false });
      }
    };

    fetchData();
  }, [selectedDevice.device_id]);

  useEffect(() => {
    let timerId;
    if (isFocused && !sensorValues.loading) {
      // Show the toast message after a delay of 2 seconds
      timerId = setTimeout(() => {
        showToastInCenter("Displaying the latest info", 'success');
      }, 1000);
    }
  
    return () => {
      // Clear the timer when the component unmounts or the dependencies change
      clearTimeout(timerId);
    };
  }, [isFocused, sensorValues.loading]);

  if (sensorValues.loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  const urls = [
    `https://nimblevision-speedometer.web.app/?pH=${sensorValues.pH}`,
    `https://nimblevision-speedometer.web.app/?temperature=${sensorValues.temperature}`,
    `https://nimblevision-speedometer.web.app/?orp=${sensorValues.orp}`,
  ];

  return (
    <ScrollView style={{ flex: 1 }}>
      <TouchableOpacity onPress={hideEllipsisOptions} activeOpacity={1}>
        <Text style={styles.heading}>Last Update Received:</Text>
        <Text style={styles.time}>{sensorValues.timestamp}</Text>
        <View style={styles.center}>
          {urls.map((url, index) => (
            <View key={`webview-container-${index}`} style={styles.webviewContainer}>
              <WebView
                key={`webview-${index}`}
                source={{ uri: url }}
                style={styles.webview}
              />
              {index < urls.length - 1 && <View style={styles.thickLine} />}
            </View>
          ))}
        </View>
        <View style={{ marginBottom: 50 }}></View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Live;
