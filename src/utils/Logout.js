// utils/logout.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const logout = async (clearUser, navigation) => {
  try {
    await AsyncStorage.clear(); 
    clearUser();
    navigation.navigate('LoginScreen');
  } catch (error) {
    console.error('logout error:', error);
  }
};
