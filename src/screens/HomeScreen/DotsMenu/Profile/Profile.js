import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './ProfileStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../../../../context/userContext';
const Profile = ({ route, navigation }) => {
  const { email, phone } = route.params || {};
  const { clearUser } = useUser();
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); 
      clearUser();
    } catch (error) {
      console.error('AsyncStorage error during logout:', error);
    }
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Image source={require('./Profile.png')} style={styles.userIcon} />
      <View style={styles.infoContainer}>
        <Ionicons name="mail" size={24} color="black" style={styles.icon} />
        <Text style={styles.infoText}>{email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Ionicons name="call" size={24} color="black" style={styles.icon} />
        <Text style={styles.infoText}> {phone} {'               '}</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Ionicons name="log-out-outline" size={20} color="white" style={{ marginRight: 8 }} />
    <Text style={styles.buttonText}>Logout</Text>
  </View>
</TouchableOpacity>

    </View>
  );
};

export default Profile;
