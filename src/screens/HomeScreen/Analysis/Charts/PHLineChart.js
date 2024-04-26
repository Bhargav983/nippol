import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, processColor } from 'react-native';
import { LineChart } from 'react-native-charts-wrapper';
import CustomModal from '../../../../utils/CustomModal';

const COLOR_PURPLE = processColor('#697dfb');

const PHLineChart = ({ data }) => {
  const [chartData, setChartData] = useState({});
  const [xAxis, setXAxis] = useState({});
  const [yAxis, setYAxis] = useState({});
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [selectedXIndex, setSelectedXIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reversedData = data;
        console.log("chart reversed data =",reversedData )
        const size = reversedData.length;

        const updatedXAxis = {
          valueFormatter: reversedData.map(item => item.time),
          position: 'BOTTOM',
          granularityEnabled: true,
          granularity: 1,
          axisMinimum: 0,
          axisMaximum: size - 1,
          textColor: processColor('red'),
          textSize: 16,
          gridColor: processColor('red'),
          gridLineWidth: 1,
          axisLineColor: processColor('darkgray'),
          axisLineWidth: 1.5,
          gridDashedLine: {
            lineLength: 10,
            spaceLength: 10
          },
          avoidFirstLastClipping: true,
        };

        const updatedYAxis = {
          left: {
            drawGridLines: false,
            axisMinimum: 0,
            axisMaximum: 1,
          },
          right: {
            enabled: false
          }
        };
        setXAxis(updatedXAxis);
       
        const updatedData = {
          dataSets: [{
            values: reversedData.map(item => ({ y: parseInt(item.pH) })),
            label: '',
            config: {
              lineWidth: 1.5,
              drawCircles: false,
              drawCubicIntensity: 0.3,
              drawCubic: true,
              drawHighlightIndicators: false,
              color: COLOR_PURPLE,
              drawFilled: true,
              fillColor: COLOR_PURPLE,
              fillAlpha: 90
            }
          }],
        };
        setChartData(updatedData);
       

      } catch (error) {
        console.error('Error fetching motor data:', error);
      }
    };

    fetchData();
  }, [data]);

  const handleSelect = (event) => {
    if (event.nativeEvent == null) {
      setSelectedEntry(null);
      setSelectedXIndex(null);
    } else {
      const entry = chartData.dataSets[0].values[event.nativeEvent.x];
      setSelectedEntry(entry);
      setSelectedXIndex(event.nativeEvent.x);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <LineChart
          style={styles.chart}
          data={chartData}
          chartDescription={{ text: '' }}
          xAxis={xAxis}
          yAxis={yAxis}
          legend={{ enabled: false }}
          onSelect={handleSelect}
          onChange={(event) => console.log(event.nativeEvent)}
          scaleXEnabled={true} // Enable x-axis zooming
          scaleYEnabled={false} // Disable y-axis zooming
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    position: 'relative',
    height:300,
    width: 350
  },
  chart: {
    flex: 1
  },
  verticalLine: {
    position: 'absolute',
    backgroundColor: 'red',
    width: 1,
    height: '100%',
    zIndex: 1
  }
});

export default PHLineChart;
