import React, { useEffect } from 'react'
import { Container, Typography, Box } from '@material-ui/core';
import { observer, useObserver } from 'mobx-react';
import { weatherStore } from '../../mobx/weater.store';


const FavoritesPage = () => {

  useEffect(() => {
    weatherStore.getFavoriteCities()
    return () => { };
  }, [])

  return useObserver(() => {
    const { favoriteCities } = weatherStore;

    return (
      <Container>
        <Box display='flex' justifyContent='center'>
          <Typography variant='h6'>
            Bookmarked cities
          </Typography>
        </Box>
        {favoriteCities.map((favoriteCity) => {
          console.log(favoriteCity);
          return (
            <p key={favoriteCity.id}>Favorite City</p>
          )
        })}
      </Container>
    )
  })
}

export default observer(FavoritesPage);