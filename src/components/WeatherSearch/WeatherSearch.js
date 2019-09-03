import React, { Component } from 'react'
import { debounce } from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { Tooltip } from '@material-ui/core';

import ClearIcon from '@material-ui/icons/Close';
import FavoritesIcon from '@material-ui/icons/Bookmark';

const styles = theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 800,
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
});

class WeatherSearch extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchString: ''
    }
  }

  onInputChange = (e) => {
    this.setState({
      searchString: e.target.value
    })
    // debounce()
  }

  onInputClear = () => {
    this.setState({
      searchString: ''
    })
  }

  render() {
    const { classes } = this.props;
    const { searchString } = this.state;

    return (
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="What is the weather like in ..."
          inputProps={{ 'aria-label': 'search google maps' }}
          onChange={this.onInputChange}
          value={searchString}
        />
        <IconButton
          color="primary"
          className={classes.iconButton}
          disabled={!searchString.length}
          aria-label="directions"
          onClick={this.onInputClear}
        >
          <ClearIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <Tooltip title='Add city to bookmarks'>
          <>
            <IconButton color="primary" className={classes.iconButton} disabled={true} aria-label="directions">
              <FavoritesIcon />
            </IconButton>
          </>
        </Tooltip>
      </Paper>
    )
  }
}

export default withStyles(styles)(WeatherSearch);