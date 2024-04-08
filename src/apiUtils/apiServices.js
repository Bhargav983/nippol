import axios from 'axios';
import { getTankWaterLevelUrl,getDeviceTanksUrl,getPieChartDataUrl,getBarChartDataUrl} from './apiUrls';

export const getDeviceTanksData = async (profileType,deviceId) => {
  if (!profileType) {
    throw new Error('No selected device');
  }
  try {
    const response = await axios.get(getDeviceTanksUrl(profileType,deviceId));
    return response.data.tanks || [];
  } catch (error) {
    console.error('Error fetching tank details:', error);
    throw error;
  }
};

export const fetchBarChartData = async (profileType, deviceId, tankId) => {
  try {
    const response = await fetch(getBarChartDataUrl(profileType, deviceId, tankId));
    const data = await response.json();
    const updateAvailable = data !== undefined;
    return {
      data: data.data, 
      updateAvailable: updateAvailable
    };
  } catch (error) {
    console.error('Error fetching device tank state:', error);
    return {
      data: undefined,
      updateAvailable: false
    };
  }
};

  

export const fetchPieChartData = async (profileId, deviceId, tankId) => {
  try {
    const response = await fetch(getPieChartDataUrl(profileId, deviceId, tankId));
    const data = await response.json();
    if (data && data.data) {
      const total = data.data.reduce((acc, curr) => acc + curr.onehrs, 0);
      const details = data.data.filter(item => item.onehrs > 0).map(item => ({
        created_at: item.created_at,
        onehrs: item.onehrs,
      }));
      // If we have data, we consider an update to be available
      return { total, details, updateAvailable: true };
    }
    // If data.data is empty or not in the expected format, we return defaults and consider no update available
    return { total: 0, details: [], updateAvailable: false };
  } catch (error) {
    console.error('Error fetching consumption data:', error);
    return { total: undefined, details:undefined, updateAvailable: false };
  }
};



  export const fetchTankDetailsAndWaterHeight = async (profileType, deviceId) => {
    try {
      const tanksResponse = await axios.get(getDeviceTanksUrl(profileType, deviceId));
      const tanksData = await  tanksResponse.data.tanks || [];
      const sensorType= tanksResponse.data.sensor_type;
      const tanksWithDetails = await Promise.all(tanksData.map(async (tank) => {
        try {
          const waterHeightResponse = await fetch(getTankWaterLevelUrl(profileType, deviceId, tank.tank_id));
          const waterHeightData = await waterHeightResponse.json();
          
          let currentWaterHeight = waterHeightData.tank_distance || 0;
          let livepercentage = tank.tank_distance - currentWaterHeight;
          let percentage, updateAvailable;
          console.log("water height = ",waterHeightData.tank_distance);
          console.log("sensor type = ",sensorType);
          if (sensorType > 0) {
            percentage = (currentWaterHeight * 100 / tank.tank_distance).toFixed(1);
            updateAvailable = true;
          } else if (sensorType === 0) {
            if (livepercentage < tank.tank_distance) {
              percentage = ((livepercentage * 100) / tank.tank_distance).toFixed(1);
              updateAvailable = true;
            } else {
              percentage = 0;
              updateAvailable = false;
            }
          } else {
            percentage = 0;
            updateAvailable = false;
          }
          
          // updateAvailable = waterHeightData.tank_distance !=='undefined' ? true: false;
          updateAvailable = waterHeightData.tank_distance !== undefined && waterHeightData.tank_distance !== '';
          console.log('inside ',updateAvailable)
          if(updateAvailable){
            return {
              tankName: tank.tank_name,
              percentage: parseFloat(percentage),
              updateAvailable:true
            };
          }
          else{
            return {
              tankName: tank.tank_name,
              percentage: parseFloat(percentage),
              updateAvailable:false
            };
          }
          
        } catch (error) {
          console.error(`Error fetching water height for tank ${tank.tank_id}:`, error);
          return {
            tankName: tank.tank_name,
            percentage: 0,
            updateAvailable: false
          };
        }
      }));
  
      return tanksWithDetails;
    } catch (error) {
      console.error('Error fetching tank details and water height:', error);
      throw error;
    }
  };
  
