/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from '../services/styles';
import googleWrapper from '../services/GoogleWrapper';
import http from '../services/$$http';

function PrimarySearchAppBar() {
  const [isGoogleReady, setIsGoogleReady] = useState(false);
  const [isAutenticated, setIsAutenticated] = useState(false);

  const classes = useStyles();
  const [setMobileMoreAnchorEl] = React.useState(null);

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  function initialize(token) {
    http.httpHeaders['Authorization'] = token;
    http.get('https://localhost:8126/employees/all').then(data => {
      //polpulate redux, this request also could be out of hear
    });

    setIsAutenticated(true);
  }

  function handleLogin() {
    googleWrapper.ready()
      .then(() => {
        if (isAutenticated)
          googleWrapper.logOut().then(() => {
            setIsAutenticated(false);
          });
        else
          googleWrapper.login().then(initialize);
      });
  }

  if (!isGoogleReady) {
    googleWrapper.ready()
      .then(googleWrapper.connected)
      .then((initialize))
      .finally(() => setIsGoogleReady(true));
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={classes.title} variant="h6" noWrap>
          Test-intel
          </Typography>

        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>

        <div className={classes.grow} />
        <div>
          <Button color="inherit" disabled={!isGoogleReady} onClick={handleLogin}>{isAutenticated ? 'Logout' : 'Login'}</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default PrimarySearchAppBar;
