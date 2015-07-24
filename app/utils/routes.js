import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

export default (
  <Route name='app' path='/' handler={require('../components/App')}>
    <DefaultRoute handler={require('../components/greeting')}/>
    <Route
      name='login'
      handler={require('../components/Login')} />
  </Route>
);
