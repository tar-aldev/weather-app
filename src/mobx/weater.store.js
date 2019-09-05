import { observable, action } from 'mobx';
import weatherService from '../services/weather.service';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorage';

export default class WeatherStore {
  @observable.ref favoriteCitiesIds = [];
  @observable.ref favoriteCities = [];
  @observable.ref foundCityWeather = null;
  @observable isLoading = false;
  @observable error = null;

  @action findWeatherByCityName = (cityName) => {
    this.isLoading = true;
    weatherService.getWeatherByCityName(cityName)
      .then((response) => {
        this.findWeatherByCityNameSuccess(response)
      })
      .catch((error) => { this.findWeatherByCityNameFailure(error.response.data.message) })
  }

  @action findWeatherByCityNameSuccess = (response) => {
    console.log('success')
    this.isLoading = false;
    this.foundCityWeather = response;
  }

  @action findWeatherByCityNameFailure = (error) => {
    this.isLoading = false;
    this.error = error;
  }

  @action resetFoundCityWeather = () => {
    this.foundCityWeather = null;
  }

  @action addCityToFavorites = () => {
    console.log('add to favorites');
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

  @action removeCityFromBookmarked = (cityId) => {
    this.favoriteCitiesIds = this.favoriteCitiesIds.filter((id) => id !== cityId);
    saveToLocalStorage('favoriteCitiesIds', this.favoriteCitiesIds);
    this.favoriteCities = this.favoriteCities.filter((city) => city.id !== cityId);
  }
}

export const weatherStore = new WeatherStore();