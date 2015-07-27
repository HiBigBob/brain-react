import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

export default (
  <Route name='app' path='/' handler={require('../components/App')} >
    <DefaultRoute
      name='dashboard'
      handler={require('../components/Main')} />
    <Route
      name='login'
      handler={require('../components/Login')} />
  </Route>
);
