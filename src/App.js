import React, { useEffect } from 'react';
import { Router, Redirect } from '@reach/router';
import SearchPage from './pages/Search/SearchPage';
import FavoritesPage from './pages/Favorites/FavoritesPage';
import Header from './components/Header/Header';
import { weatherStore } from './mobx/weater.store';

const App = () => {

  useEffect(() => {
    weatherStore.syncFavoriteCitiesWithLocalStorage();
    return () => { };
  }, [])

  return (
    <>
      <Header />
      <Router>
        <SearchPage path='search' />
        <FavoritesPage path='bookmarked' />
        <Redirect from='/' to='search' />
      </Router>
    </>
  );
}

export default App;
