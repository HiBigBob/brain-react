'use strict';

import React from 'react';

import List from './List';

export default class Sidebar extends React.Component {
  render() {
    return (
      <nav id="sidebar">
          <div id="sidebar-scroll">
              <div className="sidebar-content">
                  <div className="side-header side-content bg-white-op">
                      <button className="btn btn-link text-gray pull-right hidden-md hidden-lg" type="button" data-toggle="layout" data-action="sidebar_close">
                          <i className="fa fa-times"></i>
                      </button>
                      <a className="h5 text-white" href="index.html">
                          <i className="fa fa-check-square text-primary"></i> <span className="h5 font-w600 sidebar-mini-hide">brain</span>
                      </a>
                  </div>
                  <div className="side-content">
                      <List user={this.props.user} />
                  </div>
              </div>
          </div>
      </nav>
    );
  }
}
