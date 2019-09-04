import axios from 'axios';
import variables from '../variables';
import { cloneDeep, pick } from 'lodash';

axios.interceptors.request.use((req) => {
  const { apiKey } = variables;
  req.params.APPID = apiKey;
  req.params.units = 'metric';
  return req;
})

axios.interceptors.response.use(
  (response) => {
    return response;
  }, (error) => {
    return error.response;
  }
)

const weatherService = () => {
  const { weatherApiIconBaseUrl, weatherApiBaseUrl } = variables;

  const modifyWeatherIconLink = (weatherInfo) => {
    console.log(weatherInfo);
    const copy = cloneDeep(weatherInfo);
    copy.weather.forEach((weatherItem) => {
      weatherItem.icon = `${weatherApiIconBaseUrl}/${weatherItem.icon}.png`;
    })
    return copy;
  }

  return {
    getWeatherByCityName: async (cityName) => {
      const { data } = await axios.get(`${weatherApiBaseUrl}/weather`, {
        params: {
          q: cityName
        }
      })
      const modifiedData = modifyWeatherIconLink(data);
      return pick(modifiedData, ['coord', 'id', 'main', 'name', 'weather', 'wind']);
    }
  }
}

export default weatherService();