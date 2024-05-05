// apiUrls.js

const BASE_URL = 'https://nimblevision.io/public/api/';

const generateUrl = (endpoint, params = {}) => {
  const queryString = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

  return `${BASE_URL}${endpoint}?${queryString}&key=chinnu&token=257bbec888a81696529ee979804cca59`;
};

export const GET_LATEST_DATA_ENDPOINT = 'getDeviceDiagnosticInfoNisensu';
export const VERIFY_USER_BY_PHONE_MAIL_ENDPOINT = 'postuserphone';
export const GET_DEVICES_ENDPOINT = 'getUserDeviceIds'; 
export const GET_DEVICE_TANKS_ENDPOINT = 'getDeviceTank'; 
export const GET_WATER_LEVEL_ENDPOINT = 'getDeviceTankState1'; 
export const GET_PIE_CHART_DATA_ENDPOINT = 'getDeviceTankState2'; 
export const GET_BAR_CHART_DATA_ENDPOINT = 'getDeviceTankState3'; 
export const GET_LATEST_SENSOR_DATA_ENDPOINT = 'getDeviceDiagnosticInfoNisensu';

export const getLatestSensorDataUrl = (deviceId) => generateUrl(GET_LATEST_DATA_ENDPOINT, { device_id: deviceId });
export const postUserByPhoneEmailUrl = (phone, email) => generateUrl(VERIFY_USER_BY_PHONE_MAIL_ENDPOINT, { user_phone: phone, user_email: email });
export const getDevicesUrl = (phone, email) => generateUrl(GET_DEVICES_ENDPOINT, { user_phone: phone, user_email: email });
export const getDeviceTanksUrl = (profileType, deviceId) => generateUrl(GET_DEVICE_TANKS_ENDPOINT, { profile_type: profileType, device_id: deviceId });
export const getTankWaterLevelUrl = (profileType, deviceId, tankId) => generateUrl(GET_WATER_LEVEL_ENDPOINT, { profile_type: profileType, device_id: deviceId, tank_id: tankId });
export const getPieChartDataUrl = (profileId, deviceId, tankId) => generateUrl(GET_PIE_CHART_DATA_ENDPOINT, { profile_type: profileId, device_id: deviceId, tank_id: tankId });
export const getBarChartDataUrl = (profileId, deviceId, tankId) => generateUrl(GET_BAR_CHART_DATA_ENDPOINT, { profile_type: profileId, device_id: deviceId, tank_id: tankId });
export const getSensorDataUrl = (deviceId) => generateUrl(GET_LATEST_SENSOR_DATA_ENDPOINT, { device_id: deviceId });
