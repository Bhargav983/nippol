import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
      },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: responsiveHeight(1),
  },
 text: {
    textAlign: 'center',
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold', 
    color:'black'
},

  subtext: {
    textAlign: 'left',
    color:'black',
    fontSize: responsiveFontSize(2.9), 
    marginTop: responsiveHeight(2),  
  },
  subtext1: {
    color:'black',
    fontSize: responsiveFontSize(2.9), 
    marginTop: responsiveHeight(2), 
    marginBottom: responsiveHeight(2),  
  },
  separator: {
    width: '100%',
    borderBottomColor: '#141964',
    borderBottomWidth: responsiveWidth(1),
  },
  subseparator: {
    width: '100%',
    borderBottomColor: '#141964',
    borderBottomWidth: responsiveWidth(0.5),
  },
  userIcon: {
    width: responsiveWidth(45),
    height: responsiveHeight(40),
    marginTop: responsiveHeight(3.5),
  },
  pieIcon: {
    width: responsiveWidth(100),
    height: responsiveHeight(55),
    marginTop: responsiveHeight(10.5),
  },
});

export default styles;
