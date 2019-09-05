import React, { useState, useEffect } from 'react'
import { useObserver } from 'mobx-react';
import { useFavoritesBtn } from '../../hooks/useFavoritesBtn';
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

const WeatherSearch = ({ foundCityWeather, favoriteCitiesIds, isLoading }) => {

  const classes = useStyles();
  const [searchString, setSearchString] = useState('');
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


  let favoritesBtnDisabled = true;
  if (foundCityWeather) {
    favoritesBtnDisabled = favoriteCitiesIds.includes(foundCityWeather.id)
  }

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
        disabled={!searchString.length || isLoading}
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
      <Tooltip title='Add to favorites'>
        <div>
          <IconButton
            color="primary"
            className={classes.iconButton}
            aria-label="directions"
            onClick={addToFavorites}
            disabled={favoritesBtnDisabled}
          >
            <FavoritesIcon />
          </IconButton>
        </div>
      </Tooltip>
    </Paper>
  );
}

export default WeatherSearch;