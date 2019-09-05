import React from 'react'
import { Typography, Card, CardContent, CardHeader, makeStyles, Box } from '@material-ui/core';
import WeatherInfoBase from '../WeatherInfoBase/WeatherInfoBase';

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(4)
  }
}))

export default function WeatherInfo({ foundCityWeather }) {
  const classes = useStyles();

  if (foundCityWeather) {
    return (
      <Card className={classes.main}>
        <CardHeader
          title={<CardTitle cityName={foundCityWeather.name} lat={foundCityWeather.coord.lat} lon={foundCityWeather.coord.lon} />}
        />
        <WeatherInfoBase cityWeather={foundCityWeather} />
      </Card>
    )
  } else {
    return (
      <p></p>
    )
  }
}

function CardTitle({ cityName, lat, lon }) {
  return (
    <Box display='flex' alignItems='baseline'>
      <Typography variant='h6'>
        {cityName}
      </Typography>
      <Typography variant='body2'>
        (Lat: {lat}, Lng: {lon})
      </Typography>
    </Box>
  )
}