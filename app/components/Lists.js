'use strict';

import React from 'react';
import ListStore from '../stores/list-stores';
import ListActions from '../actions/list-actions';

export default class Lists extends React.Component {
  static getStores() {
    return [ListStore];
  }

  static getPropsFromStores() {
    return {
        lists: ListStore.getState().lists
    };
  }

  componentWillMount() {
    ListActions.fetchAll();
  }
  render() {
    console.log("test");
    console.log(this.props.lists);
    var lists = this.props.ListStore.lists;
    console.log(lists);
    return (
        <li className="nav-main-heading"><span className="sidebar-mini-hide">List</span></li>
    );
  }
}
