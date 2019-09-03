import { autorun, observable, computed, action, decorate } from 'mobx';

export default class WeatherStore {
  favoriteCities = [];

  constructor() { }
}

decorate(WeatherStore, {
  favoriteCities: observable
})

export const weatherStore = new WeatherStore();