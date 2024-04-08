import React from 'react';
import { View, FlatList, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import styles from './TopNavBarStyles'; // Ensure this path is correct

const DeviceOptionsModal = ({ isVisible, onHide, deviceDetails, onSelectDevice,selectedOption }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onSelectDevice(item)}>
      <View style={styles.optionItem}>
        <Text style={styles.optionText}>
          {item.device_name}
        </Text>
        {selectedOption === item.device_name && (
          <FontAwesome name="check" size={20} color="white" style={styles.checkIcon} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackdropPress={onHide}
      style={styles.modalContainer}
      backdropOpacity={0}
    >
      <TouchableWithoutFeedback onPress={onHide}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={deviceDetails}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DeviceOptionsModal;
