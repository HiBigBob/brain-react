'use strict';

import React from 'react';

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
                          <i className="fa fa-circle-o-notch text-primary"></i> <span className="h4 font-w600 sidebar-mini-hide">ne</span>
                      </a>
                  </div>
                  <div className="side-content">
                      <ul className="nav-main">
                          <li>
                              <a className="active" href="index.html"><i className="si si-speedometer"></i><span className="sidebar-mini-hide">Dashboard</span></a>
                          </li>
                          <li className="nav-main-heading"><span className="sidebar-mini-hide">User Interface</span></li>
                          <li>
                              <a className="nav-submenu" data-toggle="nav-submenu" href="#"><i className="si si-badge"></i><span className="sidebar-mini-hide">UI Elements</span></a>
                              <ul>
                                  <li>
                                      <a href="base_ui_widgets.html">Widgets</a>
                                  </li>
                                  <li>
                                      <a className="nav-submenu" data-toggle="nav-submenu" href="#">Blocks</a>
                                      <ul>
                                          <li>
                                              <a href="base_ui_blocks.html">Styles</a>
                                          </li>
                                      </ul>
                                  </li>
                              </ul>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
      </nav>
    );
  }
}
