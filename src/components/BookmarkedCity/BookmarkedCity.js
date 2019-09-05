import React from 'react'
import { Grid, Card, CardContent, CardHeader, Box, Typography, CardActions, IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/CloseOutlined';
import { makeStyles } from '@material-ui/styles';
import { weatherStore } from '../../mobx/weater.store';
import WeatherInfoBase from '../WeatherInfoBase/WeatherInfoBase';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '20rem'
  },
  deleteBtn: {
    marginLeft: 'auto'
  }
}))

export default function BookmarkedCity({ city }) {
  const classes = useStyles();

  const removeCityFromBookmarked = () => {
    weatherStore.removeCityFromBookmarked(city.id)
  }

  return (
    <Grid item>
      <Card className={classes.card}>
        <CardHeader title={<BookmarkedCityHeader title={city.name} removeCityFromBookmarked={removeCityFromBookmarked} />} />
        <WeatherInfoBase cityWeather={city} />
      </Card>
    </Grid>
  )
}

function BookmarkedCityHeader({ title, removeCityFromBookmarked }) {
  const classes = useStyles();
  return (
    <Box display='flex' justifyContent='space-around' alignItems='center'>
      <Typography variant='h6'>
        {title}
      </Typography>
      <Tooltip title='Remove from bookmarked'>
        <IconButton className={classes.deleteBtn} onClick={removeCityFromBookmarked}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  )
}