import React, { useState, useEffect } from 'react'
import { weatherStore } from '../../mobx/weater.store';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { Tooltip } from '@material-ui/core';

import ClearIcon from '@material-ui/icons/Close';
import FavoritesIcon from '@material-ui/icons/Bookmark';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const WeatherSearch = ({ canAddToFavorites }) => {

  const classes = useStyles();
  const [searchString, setSearchString] = useState('');

  /* TODO: remove after finishing city info */
  useEffect(() => {
    weatherStore.findWeatherByCityName('London');
    return () => { };
  }, [])
  const onGetCityWeather = () => {
    weatherStore.findWeatherByCityName(searchString);
  }

  const handleEnterClick = (e) => {
    if (e.keyCode === 13) {
      onGetCityWeather();
    }
  }

  const addToFavorites = () => {
    weatherStore.addCityToFavorites();
    weatherStore.saveFavoriteCititesToLocalStorage();
  }

  console.log(canAddToFavorites);
  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="What is the weather like in ..."
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={(e) => setSearchString(e.target.value)}
        onKeyUp={handleEnterClick}
        value={searchString}
      />
      <IconButton
        color="primary"
        className={classes.iconButton}
        disabled={!searchString.length}
        aria-label="directions"
        onClick={onGetCityWeather}
      >
        <SearchIcon />
      </IconButton>
      <IconButton
        color="primary"
        className={classes.iconButton}
        disabled={!searchString.length}
        aria-label="directions"
        onClick={() => setSearchString('')}
      >
        <ClearIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <Tooltip title='Add city to bookmarks'>
        <div>
          <IconButton
            color="primary"
            className={classes.iconButton}
            disabled={!canAddToFavorites}
            aria-label="directions"
            onClick={addToFavorites}
          >
            <FavoritesIcon />
          </IconButton>
        </div>
      </Tooltip>
    </Paper>
  );
}

export default WeatherSearch;