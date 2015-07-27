'use strict';

import React from 'react';
import connectToStores from 'alt/utils/connectToStores';

import AuthStore from '../stores/auth-stores';
import AuthActions from '../actions/auth-actions';

import Sidebar from './Sidebar';

@connectToStores
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {}
    };
  }
  static contextTypes = {
    router: React.PropTypes.func
  }
  static propTypes = {
    error: React.PropTypes.string
  }
  static getStores() {
    return [AuthStore];
  }
  static getPropsFromStores() {
    return AuthStore.getState();
  }
  render() {
    return (
      <div id="page-container" className="sidebar-l sidebar-o side-scroll header-navbar-fixed">
        <Sidebar />
      </div>
    );
  }
}
