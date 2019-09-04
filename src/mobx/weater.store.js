import { observable, action } from 'mobx';
import weatherService from '../services/weather.service';

export default class WeatherStore {
  @observable favoriteCitiesIds = [];
  @observable favoriteCities = [];
  @observable.ref foundCityWeather = null;
  @observable isLoading = false;

  @action findWeatherByCityName = (cityName) => {
    this.isLoading = true;
    weatherService.getWeatherByCityName(cityName)
      .then(this.findWeatherByCityNameSuccess)
  }

  @action findWeatherByCityNameSuccess = (response) => {
    this.isLoading = false;
    this.foundCityWeather = response;
  }
}

export const weatherStore = new WeatherStore();