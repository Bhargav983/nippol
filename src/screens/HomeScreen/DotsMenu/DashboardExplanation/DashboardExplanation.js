import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import styles from './DashboardExplanationStyles';

const DashboardExplanation = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>THE THREE DASHBOARDS AND THEIR DETAILS INFO</Text>
        <View style={styles.separator}></View>
        <Image
          source={require('./Img4.jpg')}
          style={styles.userIcon}
        />
        <Text style={styles.subtext}>This dashboard gives the live status {'  '}of the over head tank. The water is shown in the %.</Text>
        <Text style={styles.subtext}>The 40% means tank has 400 litres of water if the full tank capacity is 1000 litres.</Text>
        <Text style={styles.subtext1}>The percentage keeps changing,more the water higher the percentage %</Text>
        <View style={styles.subseparator}></View>
        <Image
          source={require('./Img2.jpg')}
          style={styles.pieIcon}
        />
        <Text style={styles.subtext}>This dashboard gives the daily {'           '}consumption break up hourly.</Text>
        <Text style={styles.subtext}>The each section of the Pie chart represents each hour and the number of litres consumed.</Text>
        <Text style={styles.subtext1}>The central information gives the {'       '}total water consumed for the entire day</Text>
        <View style={styles.subseparator}></View>
        <Image
          source={require('./Img3.jpg')}
          style={styles.pieIcon}
        />
         <Text style={styles.subtext}>This dashboard gives the details of {'   '}past consumption.</Text>
         <Text style={styles.subtext1}>Each column represents  each  day and number of litres water consumed</Text>
      </View>
    </ScrollView>
  );
};

export default DashboardExplanation;
