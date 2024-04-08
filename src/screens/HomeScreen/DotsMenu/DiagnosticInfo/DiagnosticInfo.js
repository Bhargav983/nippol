import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text,ActivityIndicator } from 'react-native';
import { useDeviceContext } from '../../../../context/DeviceContext';
import { styles } from './DiagnosticInfoStyles';
const DiagnosticSection = ({ title, updates, diagnostics }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.lastUpdate}>Server received last update on </Text>
    <Text style={styles.updatedDate}> {updates}</Text>
    <View  style={styles.itemRow}></View>
    {diagnostics.map((item, index) => (
      <View key={index} style={styles.itemRow}>
        <Text style={styles.itemTitle}> {'   '}{item.title}</Text>
        <Text style={styles.itemValue}>{item.value}</Text>
      </View>
    ))}
  </View>
);

const App = () => {
  const { selectedDevice } = useDeviceContext();
  const [isLoading, setIsLoading] = useState(true);
  const [tankDetails, setTankDetails] = useState([]);
  const [diagnosticsData, setDiagnosticsData] = useState([]);

  useEffect(() => {
    const fetchTankDetails = async () => {
      if (!selectedDevice) return;
      setIsLoading(true);
      try {
        const response = await fetch(`https://nimblevision.io/public/api/getDeviceTank?profile_type=${selectedDevice.profile_type}&device_id=${selectedDevice.device_id}&key=chinnu&token=257bbec888a81696529ee979804cca59`);
        const data = await response.json();
        setTankDetails(data.tanks);
      } catch (error) {
        console.error('Error fetching tank details:', error);
      }
      setIsLoading(false);
    };

    fetchTankDetails();
  }, [selectedDevice]);

  useEffect(() => {
    const fetchDiagnostics = async () => {
      if (!selectedDevice || !selectedDevice.device_id || tankDetails.length === 0) return;
      
      setIsLoading(true);
      try {
        const diagnosticsPromises = tankDetails.map(async (tank) => {
          const response = await fetch(`https://nimblevision.io/public/api/getDeviceDiagnosticInfo?profile_type=1&device_id=${selectedDevice.device_id}&tank_id=${tank.tank_id}&key=chinnu&token=257bbec888a81696529ee979804cca59`);
          const data = await response.json();
          if (data.msg) {
            
            return {
              tankId: tank.tank_id,
              tankName: tank.tank_name,
              message: data.msg, 
            };
          }
          return {
            tankId: tank.tank_id,
            tankName: tank.tank_name,
            diagnostics: transformDiagnostics(data),
            lastUpdate: data.current_status_date
          };
        });
  
        const results = await Promise.all(diagnosticsPromises);
        setDiagnosticsData(results);
      } catch (error) {
        console.error('Error fetching diagnostic info:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchDiagnostics();
  }, [selectedDevice, tankDetails]);
  

  const transformDiagnostics = (data) => {
    return [
      { title: 'Sump Has Water ?', value: data.status_1 === "0" ? 'NO' : 'YES' },
      { title: 'Water Leakage', value: data.status_2 === "0" ? 'NO' : 'YES' },
      { title: 'Overhead sensor Issue', value: data.status_3 === "0" ? 'NO' : 'YES' },
      { title: 'Motor Status', value: data.status_4 === "0" ? 'OFF' : 'ON' },
      { title: 'Device Mode', value: data.profile_type === "0" ? 'Manual' : 'Automatic' },
      { title: 'Water TDS', value: String(data.tds) },
      { title: 'Ph', value: data.ph || '0' },
    ];
  };
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>The Device Diagnostic Details</Text>
      </View>
      {diagnosticsData.map((tankDiagnostic, index) => {
        if (tankDiagnostic.message) {
          return (
            <View key={index} style={styles.messageContainer}>
              <Text style={styles.messageText}>{tankDiagnostic.message}</Text>
            </View>
          );
        }
        return (
          <DiagnosticSection
            key={index}
            title={`Device ID: ${selectedDevice.device_id} - ${tankDiagnostic.tankName}`}
            updates={tankDiagnostic.lastUpdate}
            diagnostics={tankDiagnostic.diagnostics || []} 
          />
        );
      })}
    </ScrollView>
  );
    }  
export default App;

