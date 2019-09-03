import React from 'react';
import { Router, Redirect } from '@reach/router';
import SearchPage from './pages/Search/SearchPage';
import FavoritesPage from './pages/Favorites/FavoritesPage';
import WeatherStore from './mobx/weather.module/weater.store';
import Header from './components/Header/Header';

const weatherStore = new WeatherStore();

class App extends React.Component {

  render() {
    return (
      <>
        <Header />
        <Router>
          <SearchPage path='search' weatherStore={weatherStore} />
          <FavoritesPage path='bookmarked' weatherStore={weatherStore} />
          <Redirect from='/' to='search' />
        </Router>
      </>
    );
  }
}

export default App;
