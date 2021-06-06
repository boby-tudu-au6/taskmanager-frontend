import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function SimpleBackdrop({ loading, open }) {
  const classes = useStyles();
  return (
    <div>
      <Backdrop className={classes.backdrop} open={loading || open || false}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

const mapStateToProps = state => ({
    loading: state.loading
});

export default connect(mapStateToProps)(SimpleBackdrop)
