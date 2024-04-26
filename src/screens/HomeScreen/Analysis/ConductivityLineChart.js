import React from 'react';
import { View } from 'react-native';
import LineChart from './LineChart';

const ConductivityLineChart = ({ data }) => {
  return (
    <View>
      <LineChart
        data={data}
        x_key="time"
        y_key="conductivity"
        backgroundColor={'transparent'}
        svgBackgroundColor={'transparent'}
        useGradientBackground={true}
        gradient_background_config={{
          stop1: { offset: 0, stopColor: 'white', stopOpacity: 0.4 },
          stop2: { offset: 1, stopColor: 'white', stopOpacity: 0.8 },
        }}
      />
    </View>
  );
};

export default ConductivityLineChart;
