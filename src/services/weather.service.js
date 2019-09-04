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

  const pickWeatherFields = (weatherItem) => {
    return pick(weatherItem, ['coord', 'id', 'main', 'name', 'weather', 'wind']);
  }

  return {
    getWeatherByCityName: async (cityName) => {
      const { data } = await axios.get(`${weatherApiBaseUrl}/weather`, {
        params: {
          q: cityName
        }
      })
      const modifiedData = modifyWeatherIconLink(data);
      pickWeatherFields(modifiedData);
    },
    getFavoriteCitiesByIds: async (citiesIds) => {
      const promises = citiesIds.map((cityId) => {
        return axios.get(`${weatherApiBaseUrl}/weather`, {
          params: {
            id: cityId
          }
        })
      })

      const favoriteCitiesResponses = await Promise.all(promises);
      return favoriteCitiesResponses.map((response) => pickWeatherFields(response.data));
    }
  }
}

export default weatherService();