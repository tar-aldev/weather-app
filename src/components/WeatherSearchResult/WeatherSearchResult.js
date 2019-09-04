import React from 'react'
import { Typography, Card, CardContent, CardHeader, makeStyles, Box } from '@material-ui/core';
import weatherService from '../../services/weather.service';

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(4)
  }
}))

export default function WeatherInfo({ foundCityWeather }) {
  console.log(foundCityWeather)

  const classes = useStyles();

  if (foundCityWeather) {
    return (
      <Card className={classes.main}>
        <CardHeader
          title={<CardTitle cityName={foundCityWeather.name} lat={foundCityWeather.coord.lat} lon={foundCityWeather.coord.lon} />}
        />
        <CardContent>
          {
            foundCityWeather.weather.map((weatherItem) => (
              <Box key={weatherItem.id} display='flex' alignItems='center'>
                <img src={weatherItem.icon} alt="" />
                {weatherItem.description}
              </Box>
            ))
          }
          <Typography component='p'>
            Wind speed: {foundCityWeather.wind.speed} m/s
          </Typography>
          <Typography component='p'>
            Temperature: {foundCityWeather.main.temp} &deg;C
          </Typography>
          <Typography component='p'>
            Temperature Min: {foundCityWeather.main.temp_min} &deg;C
          </Typography>
          <Typography component='p'>
            Temperature Max: {foundCityWeather.main.temp_max} &deg;C
          </Typography>
          <Typography component='p'>
            Pressure: {foundCityWeather.main.pressure} &deg;C
          </Typography>
          <Typography component='p'>
            Humidity: {foundCityWeather.main.humidity}
          </Typography>
        </CardContent>
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
