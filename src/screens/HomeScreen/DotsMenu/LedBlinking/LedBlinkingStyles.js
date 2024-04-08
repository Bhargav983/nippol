import { StyleSheet } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: responsiveHeight(2), 
  },
  title: {
    fontSize: responsiveFontSize(2.8),
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: responsiveHeight(1), 
    color:'black'
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: responsiveHeight(0.5), 
  },
  circle: {
    width: responsiveWidth(20), 
    height: responsiveWidth(20), 
    borderRadius: responsiveWidth(10), 
    marginLeft: responsiveWidth(4), 
    marginTop: responsiveHeight(0.5), 
  },
  statusText: {
    fontSize: responsiveFontSize(2.6),
    marginLeft: responsiveWidth(6),
    color:'black'
  },
  separator: {
    borderBottomColor: "#18059e",
    borderBottomWidth: responsiveWidth(0.5),
  },
  firstseparator: {
    borderBottomColor: "#18059e",
    borderBottomWidth: responsiveWidth(0.85),
  },
});

export default styles;
