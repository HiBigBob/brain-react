'use strict';

import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <header id="header-navbar" className="content-mini content-mini-full">
          <ul className="nav-header pull-right">
              <li>
                  <div className="btn-group">
                      <button className="btn btn-default btn-image dropdown-toggle" data-toggle="dropdown" type="button">
                          <img src="assets/img/avatars/avatar10.jpg" alt="Avatar" />
                          <span className="caret"></span>
                      </button>
                      <ul className="dropdown-menu dropdown-menu-right">
                          <li className="dropdown-header">Profile</li>
                          <li>
                              <a tabindex="-1" href="base_pages_inbox.html">
                                  <i className="si si-envelope-open pull-right"></i>
                                  <span className="badge badge-primary pull-right">3</span>Inbox
                              </a>
                          </li>
                          <li>
                              <a tabindex="-1" href="base_pages_profile.html">
                                  <i className="si si-user pull-right"></i>
                                  <span className="badge badge-success pull-right">1</span>Profile
                              </a>
                          </li>
                          <li>
                              <a tabindex="-1" href="javascript:void(0)">
                                  <i className="si si-settings pull-right"></i>Settings
                              </a>
                          </li>
                          <li className="divider"></li>
                          <li className="dropdown-header">Actions</li>
                          <li>
                              <a tabindex="-1" href="base_pages_lock.html">
                                  <i className="si si-lock pull-right"></i>Lock Account
                              </a>
                          </li>
                          <li>
                              <a tabindex="-1" href="base_pages_login.html">
                                  <i className="si si-logout pull-right"></i>Log out
                              </a>
                          </li>
                      </ul>
                  </div>
              </li>
          </ul>
      </header>
    );
  }
}
