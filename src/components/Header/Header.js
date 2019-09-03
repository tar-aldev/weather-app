import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from '@reach/router';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1
  }
}));

export default function Header() {

  const classes = useStyles()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Weather app
        </Typography>
        <Button color="inherit" component={Link} to="/bookmarked">Bookmarked cities</Button>
        <Button color="inherit" component={Link} to="/search">Search</Button>
      </Toolbar>
    </AppBar>
  )
}
