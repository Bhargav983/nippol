import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import LoginScreen from './src/screens/loginscreen/LoginScreen'
import HomeScreen from './src/screens/HomeScreen/HomeScreen/HomeScreen';
import TopNavBar from './src/screens/Navbar/TopNavBar';
import DashboardExplanation from './src/screens/HomeScreen/DotsMenu/DashboardExplanation/DashboardExplanation';
import DiagnosticInfo from './src/screens/HomeScreen/DotsMenu/DiagnosticInfo/DiagnosticInfo';
import LedBlinking from './src/screens/HomeScreen/DotsMenu/LedBlinking/LedBlinking';
import About from './src/screens/HomeScreen/DotsMenu/About/About';
import Profile from './src/screens/HomeScreen/DotsMenu/Profile/Profile';
import { DeviceProvider } from './src/context/DeviceContext';
import { EllipsisOptionsProvider } from './src/context/EllipsisContext';
import { OptionsProvider } from './src/context/OptionsContext';
import { UserProvider } from './src/context/userContext';
import Live from './src/screens/HomeScreen/LiveStatus/Live';
const Stack = createStackNavigator();
import Analysis from './src/screens/HomeScreen/Analysis/Analysis';

const App = () => {
  return (
    <UserProvider>
    <OptionsProvider>
    <EllipsisOptionsProvider>
    <DeviceProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
       
        <Stack.Screen name="Live" component={Live} />
        <Stack.Screen name="Analysis" component={Analysis} />
       
        <Stack.Screen name="TopNavBar" component={TopNavBar}/>
        <Stack.Screen name="Dashboard Explanation" component={DashboardExplanation} options={{ headerShown: false }} />
        <Stack.Screen name="Diagnostic Info" component={DiagnosticInfo} options={{ headerShown: false }}/>
        <Stack.Screen name="Led Blinking" component={LedBlinking} options={{ headerShown: false }}/>
        <Stack.Screen name="About" component={About} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>

    </DeviceProvider>
    </EllipsisOptionsProvider>
    </OptionsProvider>
    </UserProvider>
  );
};

export default App;
