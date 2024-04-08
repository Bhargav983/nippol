import { StyleSheet } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: responsiveHeight(0.5), 
  },
  headerText: {
    color: '#e91e63',
    fontWeight: 'bold',
    fontSize: 22, 
    textAlign: 'center',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    borderColor: '#dee2e6',
    marginTop: responsiveHeight(1), 
    marginBottom:responsiveHeight(2),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(2.5), 
    color: '#fff',
    marginBottom: responsiveHeight(0.5), 
    textAlign: 'center',
    backgroundColor: '#e91e63',
    paddingVertical: responsiveHeight(0.8),
    paddingHorizontal: responsiveWidth(5), 
  },
  lastUpdate: {
    fontSize: responsiveFontSize(2.3), 
    color: '#343a40',
    marginBottom: responsiveHeight(1), 
    textAlign: 'center',
   
  },
  updatedDate:{
    fontSize: responsiveFontSize(2.3), 
    color:'#18059E',
    textAlign:'center'
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(0.5),
    borderBottomWidth: 1,
    borderBottomColor: '#18059E',
  },
  itemTitle: {
    color: '#343a40',
    fontSize: responsiveFontSize(2.3), 
    flex: 1,
    textAlign: 'left',
  },
  itemValue: {
    // fontWeight: 'bold',
    color: '#18059E',
    fontSize: responsiveFontSize(2.2), 
    flex: 0.5, 
    textAlign: 'left', 
  },
  messageContainer: {
    marginTop: responsiveHeight(1.2),
    paddingHorizontal: responsiveHeight(2),
    paddingVertical: responsiveHeight(1),
    backgroundColor: '#e0e0e0',
    borderRadius: responsiveHeight(1), 
  },
  messageText: {
    fontSize: responsiveFontSize(2), 
  },
});