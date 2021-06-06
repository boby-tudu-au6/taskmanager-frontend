import React, { Suspense, useEffect } from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from 'theme/theme';
import routes from './routes';
import Layout from 'layout';
import { Spinner, SnackBar } from 'components';
import { connect } from 'react-redux';
import { closeMessage, checkLogin } from 'actions';
// import { Login, Register } from 'pages';
import PrivateRoute from './PrivateRoute';

function Body(props) {
  const { message, closeMessage, checkLogin } = props;

  useEffect(() => {
    checkLogin();
  },[checkLogin]);

  return (
    <Suspense fallback={<Spinner open={true} />}>
      <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <Spinner/>
            <SnackBar
              onClose={closeMessage}
              open={message.open}
              type={message.type}
              text={message.text}
            />
            <Layout>
              <Switch>
                {/* <Route exact path="/login" render={() => { return <Login />; }} />
                <Route exact path="/register" render={() => { return <Register />; }} /> */}
                {
                  routes.map((item, i) => {
                    return (
                      <PrivateRoute key={i} {...item} />
                    );
                  })
                }
              </Switch>
            </Layout>
          </MuiThemeProvider>
      </BrowserRouter>
    </Suspense>
  )
}
const mapStateToProps = state => ({ message: state.message });
const mapDispatch = dispatch =>({ 
  closeMessage: () => dispatch(closeMessage()),
  checkLogin: () => dispatch(checkLogin())
});

export default connect(mapStateToProps, mapDispatch )(Body)

