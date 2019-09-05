import { useState } from 'react';
import { useObserver } from 'mobx-react';
import { weatherStore } from '../mobx/weater.store';

export function useFavoritesBtn() {
  const { foundCityWeather, favoriteCitiesIds } = weatherStore;
  /* const setFavoritesBtn = () => {} */
  const [isBtnDisabled, setBtnDisabled] = useState(true)
  return useObserver(() => {
    if (!foundCityWeather) {
      setBtnDisabled(true);
      /* return [true, 'Add to bookmarks']; */
    }
    if (favoriteCitiesIds.includes(foundCityWeather.id)) {
      /* return [true, 'Already in bookmarks'] */
      setBtnDisabled(favoriteCitiesIds.includes(foundCityWeather.id))
    }
    return [isBtnDisabled]
  })
}