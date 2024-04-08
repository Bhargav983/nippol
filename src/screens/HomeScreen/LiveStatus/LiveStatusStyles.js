import { StyleSheet, Dimensions } from 'react-native'; 
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  flexContainer: {
      flex: 1,
    },
container: {
  flex: 1,
  marginTop: 20,
},
scrollViewContent: {
  alignItems: 'center',
},
center: {
  flex: 1,
  justifyContent: 'center',
  width: '100%',
  backgroundColor:'white'
},
webviewContainer: {
  height: Dimensions.get('window').height / 2.5,
  marginBottom: 20,
  backgroundColor:'white'
},
webview: {
  flex: 1,
},
loader: {
  flex: 1,
  justifyContent: 'center',
},
heading: {
  fontSize: 16,
  fontWeight: 'bold',
  padding: 5,
  textAlign: 'center',
  // color: '#000',
  color:'red'
  // backgroundColor:'white'
},
time: {
  fontSize: 14,
  fontWeight: 'bold',
  margin:2,
  textAlign: 'center',
  color: 'blue',
  // backgroundColor:'white'
},
thickLine: {
  height: 5,
  backgroundColor: 'blue',
  marginVertical: 10,
},

});


export default styles;
