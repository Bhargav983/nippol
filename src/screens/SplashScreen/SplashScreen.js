import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import LogoImage from './SplashImage.png';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useState(new Animated.Value(0))[0];

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
       fadeInLogo();
      setTimeout(async () => {
        const credentials = await AsyncStorage.getItem('NiPoolPalCredentials');
        if (credentials) {
          navigation.replace('Home');
        } else {
          navigation.replace('LoginScreen');
        }
      }, 2000); 
    };

    const timeout = setTimeout(() => {
      checkCredentials();
    }, 500); 
    return () => clearTimeout(timeout);
  }, [navigation]);

  

  return (
    <View style={styles.container}>
      <Animated.Image
        source={LogoImage}
        style={[styles.logo, { opacity: fadeAnim }]}
      />
      
    </View>
  );
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
