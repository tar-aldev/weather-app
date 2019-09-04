import React from 'react';
import { Router, Redirect } from '@reach/router';
import SearchPage from './pages/Search/SearchPage';
import FavoritesPage from './pages/Favorites/FavoritesPage';
import Header from './components/Header/Header';

class App extends React.Component {

  render() {
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
}

export default App;
