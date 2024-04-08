import React from 'react';
import { View, Text } from 'react-native';
import {AboutStyles} from './AboutStyles';

const About = () => {
  return (
    <View style={AboutStyles.container}>
      {/* <Text style={AboutStyles.title}>Ni-The Water Saviour V0.1</Text> */}
      <Text style={AboutStyles.body}>All the Rights are Reserved by </Text>
      <Text style={AboutStyles.body}>Technology Partner  </Text>
      <Text style={AboutStyles.body}> Nimble Vision Pvt Ltd</Text>
      <Text style={AboutStyles.link}>www.nimblevision.io</Text>
    </View>
  );
};

export default About;
