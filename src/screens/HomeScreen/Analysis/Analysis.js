import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../../utils/Loader';
import CustomModal from '../../../utils/CustomModal'
import PHLineChart from './Charts/PHLineChart';
import ORPLineChart from './Charts/ORPLineChart';
import ConductivityLineChart from './Charts/ConductivityLineChart';
import SensorDataFetcher from './SensorDataFetcher';
import { useDeviceContext } from '../../../context/DeviceContext';
import { useEllipsisOptions } from '../../../context/EllipsisContext';
import styles from './AnalysisStyles';

const Analysis = () => {
  const { selectedDevice } = useDeviceContext();
  const { hideEllipsisOptions } = useEllipsisOptions();
  const isFocused = useIsFocused();
  const [chartVisible, setChartVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState(0); 
  const deviceId = selectedDevice.device_id;
  const { loading, sensorDataSets, latestTimestamp, updateAvailable } = SensorDataFetcher({ deviceId });

  useEffect(() => {
    if (isFocused && !loading && updateAvailable) {
      setModalVisible(true);
      setErrorMsg(1);
    }
  }, [isFocused, loading, updateAvailable]);

  if (loading) {
    return <Loader />;
  }

  if (!sensorDataSets || !sensorDataSets.pHData || !sensorDataSets.orpData || !sensorDataSets.conductivityData) {
    setTimeout(() => {
      setModalVisible(false);
      setErrorMsg(2);
    }, 1500);
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{loading ? 'Loading...' : 'No sensor data available.'}</Text>
      </View>
    );
  }

  const handleClose = () => {
    setModalVisible(false);
    setChartVisible(true);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <TouchableOpacity onPress={hideEllipsisOptions} activeOpacity={1}>
        <CustomModal visible={modalVisible} errorMsg={errorMsg} onClose={handleClose} />
        {chartVisible && (
          <View style={styles.container}>
            <Text style={styles.heading}>Last Update Received:</Text>
            <Text style={styles.time}>{latestTimestamp}</Text>
            <View style={{ marginBottom: 20 }}></View>
            <Text style={styles.line}></Text>
            <Text style={styles.heading}>PH Chart</Text>
            {sensorDataSets.pHData && <PHLineChart data={sensorDataSets.pHData} />}
            <View style={{ marginBottom: 20 }}></View>
            <Text style={styles.line}></Text>
            <Text style={styles.heading}>ORP Chart</Text>
            {sensorDataSets.orpData && <ORPLineChart data={sensorDataSets.orpData} />}
            <View style={{ marginBottom: 20 }}></View>
            <Text style={styles.line}></Text>
            <Text style={styles.heading}>Conductivity Chart</Text>
            {sensorDataSets.conductivityData && <ConductivityLineChart data={sensorDataSets.conductivityData} />}
            <View style={{ marginBottom: 100 }}></View>
          </View>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Analysis;
