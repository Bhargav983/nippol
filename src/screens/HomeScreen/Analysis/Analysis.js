import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native'; // Importing useIsFocused hook
import PHLineChart from './PHLineChart';
import TemperatureLineChart from './TemperatureLineChart';
import ORPLineChart from './ORPLineChart';
import SensorDataFetcher from './SensorDataFetcher';
import { useDeviceContext } from '../../../context/DeviceContext';
import { useEllipsisOptions } from '../../../context/EllipsisContext';
import showToastInCenter from '../../../utils/CenterToast';
import styles from './AnalysisStyles';

const Analysis = () => {
  const { selectedDevice } = useDeviceContext();
  const { hideEllipsisOptions } = useEllipsisOptions();
  const isFocused = useIsFocused(); // Using useIsFocused hook

  const deviceId = selectedDevice.device_id;
  const { loading, sensorDataSets, latestTimestamp } = SensorDataFetcher({ deviceId });

  useEffect(() => {
    let timerId;
    if (isFocused && !loading) {
      // Show the toast message after a delay of 2 seconds
      timerId = setTimeout(() => {
        showToastInCenter("Displaying the latest info", 'success');
      }, 1000);
    }
  
    return () => {
      // Clear the timer when the component unmounts or the dependencies change
      clearTimeout(timerId);
    };
  }, [isFocused, loading]);
  

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!sensorDataSets) {
    showToastInCenter("Failed to get the latest info", 'error');
    return <Text style={styles.errorText}>No sensor data available.</Text>;
  }

  const { pHData, temperatureData, orpData } = sensorDataSets;
  return (
    <ScrollView style={{ flex: 1 }}>
      <TouchableOpacity onPress={hideEllipsisOptions} activeOpacity={1}>
        <View style={styles.container}>
          <Text style={styles.heading}>Last Update Received:</Text>
          <Text style={styles.time}>{latestTimestamp}</Text>

          <View style={{ marginBottom: 20 }}></View>
          <Text style={styles.line}></Text>

          <Text style={styles.heading}>PH Chart </Text>
          <PHLineChart data={pHData} />

          <View style={{ marginBottom: 20 }}></View>
          <Text style={styles.line}></Text>
          <Text style={styles.heading}>Temperature Chart </Text>

          <TemperatureLineChart data={temperatureData} />

          <View style={{ marginBottom: 20 }}></View>
          <Text style={styles.line}></Text>

          <Text style={styles.heading}>ORP Chart </Text>
          <ORPLineChart data={orpData} />

          <View style={{ marginBottom: 100 }}></View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Analysis;
