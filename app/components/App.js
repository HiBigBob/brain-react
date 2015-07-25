import React from 'react';
import {RouteHandler} from 'react-router';

import Router from 'react-router';
import reactMixin from 'react-mixin';
import AuthActions from '../actions/auth-actions';

@reactMixin.decorate(Router.State)
export default class App extends React.Component {
  constructor(props) {
    super(props);
    AuthActions.loadLocalUser();
  }
  render() {
    return (
        <RouteHandler />
    );
  }
}
