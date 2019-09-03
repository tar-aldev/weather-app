import React, { Component } from 'react'
import { Container, Typography, Box } from '@material-ui/core';
import { observer } from 'mobx-react';

const FavoritesPage = () => {

  /* render() {
    const favoriteItems = this.props;

    console.log(favoriteItems);
 */
  return (
    <Container>
      <Box display='flex' justifyContent='center'>
        <Typography variant='h6'>
          Bookmarked cities
          </Typography>
      </Box>
    </Container >
  )/* 
  } */
}

export default observer(FavoritesPage);