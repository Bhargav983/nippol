import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './LedBlinkingStyles'; 
const statusData = [
  { id: '1', color: '#34A853', text: 'Everything is Fine' },
  { id: '2', color: '#3f51b5', text: 'The sump water is over' },
  { id: '3', color: '#9c28b1', text: 'Over head sensor Issue' },
  { id: '4', color: '#ff5925', text: 'Motor is On' },
  { id: '5', color: '#ffeb3e', text: 'Internet/WIFI not available' },
  { id: '6', color: '#ea2668', text: 'Manual Mode is On' },
];

const StatusItem = ({ color, text }) => (
  <View style={styles.statusItem}>
    <View style={[styles.circle, { backgroundColor: color }]} />
    <Text style={styles.statusText}>{text}</Text>
  </View>
);

const LedBlinking = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LED BLINKING COLOUR ON THE DEVICE AND ITS INFO</Text>
      <View style={styles.firstseparator} />
      <FlatList
        data={statusData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <StatusItem color={item.color} text={item.text} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={() => <View style={styles.separator} />}
      />
      <View> 

      </View>
    </View>
  );
};

export default LedBlinking;
