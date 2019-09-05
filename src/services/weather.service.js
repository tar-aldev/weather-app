import axios from 'axios';
import variables from '../variables';
import { cloneDeep, pick } from 'lodash';

axios.interceptors.request.use((req) => {
  const { apiKey } = variables;
  req.params.APPID = apiKey;
  req.params.units = 'metric';
  return req;
})

/* axios.interceptors.response.use(
  (response) => {
    return response;
  }, (error) => {
    return new Error(error.response);
  }
) */

const weatherService = () => {
  const { weatherApiIconBaseUrl, weatherApiBaseUrl } = variables;

  const modifyWeatherIconLink = (weatherInfo) => {
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
      if (data) {
        pickWeatherFields(data);
        const modifiedData = modifyWeatherIconLink(pickWeatherFields(data));
        return modifiedData;
      }
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
      return favoriteCitiesResponses.map((response) => {
        const modifiedData = modifyWeatherIconLink(pickWeatherFields(response.data));
        return modifiedData;
      });
    }
  }
}

export default weatherService();