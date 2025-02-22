import React, { useEffect } from 'react'
import { Container, Typography, Box, Grid, Breadcrumbs, CircularProgress } from '@material-ui/core';
import { observer, useObserver } from 'mobx-react';
import { weatherStore } from '../../mobx/weater.store';
import BookmarkedCity from '../../components/BookmarkedCity/BookmarkedCity';
import { Location } from '@reach/router';

const FavoritesPage = ({ breadcrump }) => {

  useEffect(() => {
    weatherStore.getFavoriteCities()
    return () => {
      weatherStore.resetFavoriteCities()
    };
  }, [])

  return useObserver(() => {
    const { favoriteCities, isLoading } = weatherStore;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Box display='flex' justifyContent='center' marginTop='1rem' marginBottom='1rem'>
            <Breadcrumbs>
              <Typography>
                {breadcrump} /
            </Typography>
            </Breadcrumbs>
          </Box>
          <Grid container spacing={2} justify='center'>
            {isLoading && <CircularProgress />}
            {!isLoading &&
              <>{
                favoriteCities.map((favoriteCity) => {
                  return (
                    <BookmarkedCity city={favoriteCity} key={favoriteCity.id} />
                  )
                })}
              </>
            }
          </Grid>
        </Grid>
      </Grid>
    )
  })
}

export default observer(FavoritesPage);