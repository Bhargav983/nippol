import React, { useState,useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import styles from './HomeStyles';
import TopNavBar from '../../Navbar/TopNavBar';
import Live from '../LiveStatus/Live';
import Analysis from '../Analysis/Analysis';
import { useOptionsContext } from '../../../context/OptionsContext';
import { useEllipsisOptions } from '../../../context/EllipsisContext';
import { useUser } from '../../../context/userContext';
const BottomNavbar = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Live');
  const {  hideOptions } = useOptionsContext();
  const {  hideEllipsisOptions } = useEllipsisOptions();
 const {user} = useUser();
 console.log("in home screen user =",user)
//  useEffect(() => {
  
//   if (!user.email || !user.phone) {
//     navigation.navigate('LoginScreen');
//   }
// }, [user, navigation]);
  const navigateToScreen = (screenName) => {
    setActiveTab(screenName);
    hideOptions();
    hideEllipsisOptions();
  };

  return (
    <>
      <TopNavBar email={user.email} phone={user.phone} />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigateToScreen('Live')}
        >
          <Ionicons
            name="globe-outline"
            size={28}
            color={activeTab === 'Live' ? 'white' : 'black'}
          />
          <Text
            style={[
              styles.label,
              activeTab === 'Live' && { color: 'white' },
            ]}
          >
            LIVE 
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigateToScreen('Analysis')}
        >
          <SimpleLineIcons
            name="graph"
            size={28}
            color={activeTab === 'Analysis' ? 'white' : 'black'}
          />
          <Text
            style={[
              styles.label,
              activeTab === 'Analysis' && { color: 'white' },
            ]}
          >
            Analysis
          </Text>
        </TouchableOpacity>
        
      </View>

      {activeTab === 'Live' && <Live />}
      {activeTab === 'Analysis' && <Analysis />}
    </>
  );
};

export default BottomNavbar;
