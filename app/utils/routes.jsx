'use strict';

import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

export default (
  <Route name='app' path='/' handler={require('./components/app')}>
    <DefaultRoute
      name='directors'
      handler={require('./components/brain')} />
    <Route
      name='login'
      handler={require('./components/login')} />
    <NotFoundRoute handler={require('./pages/not-found')} />
  </Route>
);
