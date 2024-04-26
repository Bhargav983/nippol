import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Modal } from 'react-native';

const CustomModal = ({ visible, errorMsg,onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        // Close the modal after 1.5 seconds
        onClose(); // Make sure to define onClose function
      }, 1500);
      
      return () => clearTimeout(timer); // Clear the timeout if the modal is closed before the timeout expires
    }
  }, [visible, onClose]);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose} // Make sure to define onClose function
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {errorMsg === 0 && <Text style={styles.modalText}>No proper latitude and longitude coordinates available for devices.</Text>}
          {errorMsg === 1 && <Text style={styles.modalText}>Displaying the latest Info </Text>}
          {errorMsg === 2 && <Text style={styles.modalText}>Error fetching device data</Text>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  modalText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default CustomModal;
