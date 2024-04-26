import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import LogoImage from './SplashImage.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../../context/userContext';
import { useDeviceContext } from '../../context/DeviceContext';
const SplashScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const { storeUser } = useUser();
  const { updateSelectedDevice } = useDeviceContext();

  useEffect(() => {
    const fadeInLogo = () => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 1000, 
          useNativeDriver: true,
        }
      ).start();
    };

    const checkCredentials = async () => {
      try {
        let credentials = await AsyncStorage.getItem('NiPoolPalCredentials');
        credentials = JSON.parse(credentials)
        if (credentials) {
          storeUser(credentials.email, credentials.phone);
          try{
          const response = await fetch(`https://nimblevision.io/public/api/getUserDeviceIds?key=chinnu&token=257bbec888a81696529ee979804cca59&user_phone=${credentials.phone}&user_email=${credentials.email}`);
          const data = await response.json();
          if (data && data.length > 0) {
            const firstDevice = data[0];
              updateSelectedDevice(firstDevice);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
          navigation.replace('Home');
          console.log('Inside the 1st if ')
        } else {
              
              navigation.replace('LoginScreen');
            }
      } catch (error) {
        console.error('Error retrieving credentials:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fadeInLogo();
    checkCredentials();

    return () => clearTimeout();
  }, [fadeAnim, navigation]);

  if (isLoading) {
    // Render loader
    return (
      <View style={styles.container}>
        <Animated.Image
          source={LogoImage}
          style={[styles.logo, { opacity: fadeAnim }]}
        />
      </View>
    );
  }

  // Render empty view while loading
  return <View />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: responsiveWidth(100), 
    height: responsiveHeight(100),
    resizeMode: 'cover', 
  },
});

export default SplashScreen;
