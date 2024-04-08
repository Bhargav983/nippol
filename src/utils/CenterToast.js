// CenterToast.js
import Toast from 'react-native-toast-message';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const showToastInCenter = (text, type) => {
  Toast.show({
    type: type,
    position: 'bottom',
    text1: text,
    visibilityTime: 1000,
    autoHide: true,
    bottomOffset: height  / 2.4, 
  });
};

export default showToastInCenter;
