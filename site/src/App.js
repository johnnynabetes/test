import React from 'react';
import Toolbar from './components/toolbar'
import useStyles from './services/styles'

function PrimarySearchAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <Toolbar/>
    </div>
  );
}

export default PrimarySearchAppBar;
