import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { TOKEN } from 'utils/constants';

const PrivateRoute = ({ component: Component, location: { pathname }, auth: { isAuthenticated }, ...rest }) => {

  return (
    <>
    {
      (pathname ==='/login' || pathname === '/register') ?
      (
        <Route
        {...rest}
        render={(props) => {
          return (localStorage.getItem(TOKEN) && isAuthenticated ? (<Redirect to="/" />)
            : (<Component {...props} />));
        }}
      />
      ): (
        <Route
        {...rest}
          render={(props) => {
            return (!localStorage.getItem(TOKEN) && !isAuthenticated ? (<Redirect to="/login" />)
              : (<Component {...props} />));
          }}
        />
      )
    }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
