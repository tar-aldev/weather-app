import React, { useEffect } from 'react'
import { Container, Typography, Box, Breadcrumbs, makeStyles, CircularProgress } from '@material-ui/core';
import WeatherSearch from '../../components/WeatherSearch/WeatherSearch';
import WeatherSearchResult from '../../components/WeatherSearchResult/WeatherSearchResult';
import { useObserver } from 'mobx-react';
import { weatherStore } from '../../mobx/weater.store';

const useStyles = makeStyles((theme) => ({
  errorMessage: {
    color: 'red',
  },
}))

const SearchPage = ({ breadcrump }) => {

  const classes = useStyles()

  useEffect(() => {
    return () => {
      weatherStore.resetFoundCityWeather()
    };
  }, [])

  return useObserver(() => {
    const { foundCityWeather, favoriteCitiesIds, isLoading, error } = weatherStore;
    return (
      <Container maxWidth="md">
        <Box display='flex' justifyContent='center' marginTop='1rem' marginBottom='1rem'>
          <Breadcrumbs>
            <Typography>
              {breadcrump} /
            </Typography>
          </Breadcrumbs>
        </Box>
        <Box display='flex' justifyContent='center' marginBottom='0.5rem'>
          <WeatherSearch foundCityWeather={foundCityWeather} favoriteCitiesIds={favoriteCitiesIds} isLoading={isLoading} />
        </Box>
        {foundCityWeather && <WeatherSearchResult foundCityWeather={foundCityWeather} />}
        {isLoading && <CircularProgress className={classes.progress} />}
        {error && (
          <Typography variant='h6' className={classes.errorMessage}>
            {error}
          </Typography>
        )}
      </Container>
    )
  })
}

export default SearchPage;