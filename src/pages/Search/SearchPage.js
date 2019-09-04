import React, { useEffect } from 'react'
import { Container, Typography, Box } from '@material-ui/core';
import WeatherSearch from '../../components/WeatherSearch/WeatherSearch';
import WeatherSearchResult from '../../components/WeatherSearchResult/WeatherSearchResult';
import { useObserver } from 'mobx-react';
import { weatherStore } from '../../mobx/weater.store';


const SearchPage = () => {

  useEffect(() => {
    return () => {
      weatherStore.resetFoundCityWeather()
    };
  }, [])

  return useObserver(() => {
    const { foundCityWeather, isLoading, error } = weatherStore;
    return (
      <Container maxWidth="md">
        <Box display='flex' justifyContent='center'>
          <Typography variant='h6'>
            Check the weather for city
            </Typography>
        </Box>
        <Box display='flex' justifyContent='center'>
          <WeatherSearch isLoading={isLoading} canAddToFavorites={!!foundCityWeather} />
        </Box>
        <WeatherSearchResult foundCityWeather={foundCityWeather} error={error} />
      </Container>
    )
  })
}

export default SearchPage;