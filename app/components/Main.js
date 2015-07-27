'use strict';

import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import {authDecorator} from '../utils/component-utils';
import AuthStore from '../stores/auth-stores';
import AuthActions from '../actions/auth-actions';

import Sidebar from './Sidebar';

@authDecorator
@connectToStores
export default class Main extends React.Component {
  static getStores() {
    return [AuthStore];
  }
  static getPropsFromStores() {
    return {
      user: AuthStore.getState().user
    };
  }
  render() {
    return (
      <div id="page-container" className="sidebar-l sidebar-o side-scroll header-navbar-fixed">
        <Sidebar user={this.props.user} />
      </div>
    );
  }
}
