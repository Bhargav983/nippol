import { StyleSheet, Dimensions } from 'react-native'; 
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
const { width: screenWidth } = Dimensions.get('window');

 const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    loader: {
      marginTop: 20,
    },
    errorText: {
      fontSize: 16,
      color: 'red',
      marginTop: 20,
    },errorContainer:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      fontSize: 16,
      fontWeight: 'bold',
      padding: 5,
      textAlign: 'center',
      color: '#000',
    },
    line: {
      height: 3,
      backgroundColor: 'blue',
      width: '100%',
    },
    time: {
      fontSize: 14,
      fontWeight: 'bold',
      margin: 2,
      textAlign: 'center',
      color: 'blue',
    },
    thickLine: {
      height: 5,
      backgroundColor: 'black',
      marginVertical: 10,
    },
  });
  export default styles;