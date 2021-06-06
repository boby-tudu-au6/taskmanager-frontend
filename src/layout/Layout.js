import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, Avatar } from '@material-ui/core';
import { ExitToApp, AccountCircleOutlined, PersonAddOutlined } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { doLogout } from 'actions';
import { getInitials } from 'utils/helpers';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: 'white',
      textDecoration: 'none'
    },
    links: {
      textDecoration: 'none',
      color: 'white'
    },
    avatar: { background: 'black', color: "white" }
  };
});

function Layout({ children, doLogout, auth: { isAuthenticated, user } }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{ background: '#FF5722'}}>
          <Link to="/" className={classes.title}>
            <Typography variant="h6">
              Task Manager
            </Typography>
          </Link>
          {
            !isAuthenticated ?
            (
              <>
                <Link to="/login" className={classes.links}>
            <Button startIcon={<AccountCircleOutlined />} color="inherit">Login</Button>
          </Link>
          <Link to="/register" className={classes.links}>
            <Button startIcon={<PersonAddOutlined />} color="inherit">Register</Button>
          </Link>
              </>
            ): (
                <>
                  <Button onClick={() => doLogout(history)} className={classes.links} startIcon={<ExitToApp />} color="inherit">Logout</Button>
                  <Avatar className={classes.avatar}>
                    {user && getInitials(user.name)}
                  </Avatar>
                </>
            )
          }
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
}

const mapStateToProps = state => ({ auth: state.auth });
const mapDispatchToProps = dispatch => ({ doLogout: (history) => dispatch(doLogout(history))})
export default connect(mapStateToProps, mapDispatchToProps)(Layout)