import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDeviceContext } from '../../../context/DeviceContext';
import { useEllipsisOptions } from '../../../context/EllipsisContext';
import { useIsFocused } from '@react-navigation/native'; 
import styles from './LiveStatusStyles';
import axios from 'axios'; 
import { getLatestSensorDataUrl } from '../../../apiUtils/apiUrls';
import Loader from '../../../utils/Loader';
import CustomModal from '../../../utils/CustomModal';

const Live = ({ navigation }) => {
  const { selectedDevice } = useDeviceContext();
  const { hideEllipsisOptions } = useEllipsisOptions();
  const isFocused = useIsFocused(); // Using useIsFocused hook
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState(0); 

  const [sensorValues, setSensorValues] = useState({ pH: '', orp: '', conductivity: '', timestamp: '', loading: true });
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getLatestSensorDataUrl(selectedDevice.device_id), {
          timeout: 5000 // Timeout after 5 seconds
        });
        console.log(getLatestSensorDataUrl(selectedDevice.device_id));
        const data = response.data;

        if (data && data.length > 0) {
          const latestReading = data[0];
          setTimeout(() => {
            setModalVisible(true);
            setErrorMsg(1);
          }, 1500);
          setSensorValues({
            pH: latestReading.tds,
            orp: latestReading.voltage_5,
            conductivity: latestReading.conductivity,
            timestamp: latestReading.timestamp,
            loading: false
          });
         
          const constructedUrls = constructUrls(latestReading);
          
          setTimeout(() => {
            setUrls(constructedUrls);
          }, 2500);
          // setLoading(false);
          // Construct URLs for WebView
          
        } else {
          setSensorValues({ pH: '', orp: '', conductivity: '', timestamp: '', loading: false });
          // showToastInCenter("Failed to get the latest info", 'error');
          setTimeout(() => {
            setModalVisible(false);
            setErrorMsg(2);
          }, 1500);
        }
      } catch (error) {
        console.log('Failed to fetch sensor data:', error);
        setSensorValues({ pH: '', orp: '', conductivity: '', timestamp: '', loading: false });
        setTimeout(() => {
          setModalVisible(false);
          setErrorMsg(2);
        }, 1500);
        if (axios.isCancel(error)) {
          // Handle timeout error
          setSensorValues({ pH: '', orp: '', conductivity: '', timestamp: '', loading: false });
          // showToastInCenter("Request timed out", 'error');
        } else {
          // Handle other errors
          // showToastInCenter("Failed to get the latest info", 'error');
        }
      }
    };

    fetchData();

    return () => {
      // Cleanup function
      // Cancel the Axios request when the component unmounts or the dependencies change
      const source = axios.CancelToken.source();
      source.cancel();
    };
  }, [selectedDevice.device_id]);


  useEffect(() => {
    let timerId;
    if (isFocused && !sensorValues.loading && sensorValues.pH) {
      // Show the toast message after a delay of 2 seconds
      timerId = setTimeout(() => {
        console.log(sensorValues)
        // showToastInCenter("Displaying the latest info", 'success');
        setTimeout(() => {
          setModalVisible(true);
          setErrorMsg(1);
        }, 1500);
      }, 1000);
    }

    return () => {
      // Clear the timer when the component unmounts or the dependencies change
      clearTimeout(timerId);
    };
  }, [isFocused, sensorValues.loading]);

  const constructUrls = (reading) => {
    return [
      `https://nimblevision-speedometer.web.app/?pH=${reading.tds}`,
      `https://nimblevision-speedometer.web.app/?orp=${reading.voltage_5}`,
      `https://nimblevision-speedometer.web.app/?conductivity=${reading.conductivity}`,
    ];
  };

  // console.log("loader =", sensorValues.loading)
  if (sensorValues.loading) {
    return (
      <Loader/>
    );
  }
  const handleClose=()=>{
    setModalVisible(false);
   }
  if (!sensorValues.pH || !sensorValues.orp || !sensorValues.conductivity) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No sensor data available.</Text>
      </View>
    );
  }

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
        <CustomModal visible={modalVisible} errorMsg={errorMsg} onClose={handleClose} />

      </TouchableOpacity>
    </ScrollView>
  );
};

export default Live;
