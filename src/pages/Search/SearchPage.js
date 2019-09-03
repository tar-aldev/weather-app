import React from 'react'
import { Container, Typography, Box } from '@material-ui/core';
import WeatherSearch from '../../components/WeatherSearch/WeatherSearch';

export default function SearchPage() {
  return (
    <Container>
      <Box display='flex' justifyContent='center'>
        <Typography variant='h6'>
          Check the weather for city
        </Typography>
      </Box>
      <Box display='flex' justifyContent='center'>
        <WeatherSearch />
      </Box>
    </Container>
  )
}
