import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './TopNavBarStyles';
import { useNavigation } from '@react-navigation/native';
import { useDeviceContext } from '../../context/DeviceContext';
import { useEllipsisOptions } from '../../context/EllipsisContext';
import { useOptionsContext } from '../../context/OptionsContext';
import EllipsisOptionsMenu from './EllipsisOptionsMenu';
import DeviceOptionsModal from './DeviceOptionsModal';

const TopNavBar = ({ email, phone }) => {
  const navigation = useNavigation();
  const { selectedDevice, updateSelectedDevice } = useDeviceContext();
  const { showEllipsisOptions, toggleEllipsisOptions, hideEllipsisOptions } = useEllipsisOptions();
  const { showOptions, toggleOptions, hideOptions } = useOptionsContext();
  const [deviceDetails, setDeviceDetails] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [isFirstDevice, setIsFirstDevice] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://nimblevision.io/public/api/getUserDeviceIds?key=chinnu&token=257bbec888a81696529ee979804cca59&user_phone=${phone}&user_email=${email}`);
        const data = await response.json();
        setDeviceDetails(data);
        if (data && data.length > 0) {
          const firstDevice = data[0];
          if (!isFirstDevice) {
            setSelectedOption(firstDevice.device_name); 
            updateSelectedDevice(firstDevice);
            setIsFirstDevice(true);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [email, phone, updateSelectedDevice]);

  const handleOptionSelect = (option) => {
    updateSelectedDevice(option);
    setSelectedOption(option.device_name);
    hideOptions();
  };

  const navigateAndCloseDropdown = (screenName) => {
    navigation.navigate(screenName, { email, phone });
    hideEllipsisOptions();
  };

  return (
    <TouchableWithoutFeedback onPress={hideEllipsisOptions}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}> {'        '}Chemzeal</Text>
          <TouchableOpacity onPress={toggleOptions}>
            <FontAwesome name="caret-down" size={24} color="white" style={styles.dropdownIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleEllipsisOptions} style={styles.ellipsisIconContainer}>
            <FontAwesome name="ellipsis-v" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <DeviceOptionsModal
          isVisible={showOptions}
          onHide={hideOptions}
          deviceDetails={deviceDetails}
          onSelectDevice={handleOptionSelect}
          selectedOption={selectedOption}
        />

        {showEllipsisOptions && (
          <EllipsisOptionsMenu navigateAndCloseDropdown={navigateAndCloseDropdown} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TopNavBar;
