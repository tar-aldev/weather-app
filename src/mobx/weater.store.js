import { observable, action } from 'mobx';
import weatherService from '../services/weather.service';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorage';

export default class WeatherStore {
  @observable.ref favoriteCitiesIds = [];
  @observable.ref favoriteCities = [];
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

  @action resetFoundCityWeather = () => {
    this.foundCityWeather = null;
  }

  @action addCityToFavorites = () => {
    this.favoriteCitiesIds = [...this.favoriteCitiesIds, this.foundCityWeather.id];
  }

  @action getFavoriteCities = () => {
    this.syncFavoriteCitiesWithLocalStorage()
    weatherService.getFavoriteCitiesByIds(this.favoriteCitiesIds)
      .then(this.getFavoriteCitiesByIdsSuccess)
  }

  @action getFavoriteCitiesByIdsSuccess = (response) => {
    this.favoriteCities = response;
  }

  @action syncFavoriteCitiesWithLocalStorage = () => {
    this.favoriteCitiesIds = getFromLocalStorage('favoriteCitiesIds');
  }

  @action saveFavoriteCititesToLocalStorage = () => {
    saveToLocalStorage('favoriteCitiesIds', this.favoriteCitiesIds);
  }
}

export const weatherStore = new WeatherStore();