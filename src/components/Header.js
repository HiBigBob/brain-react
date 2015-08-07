import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';

export default AuthenticatedComponent(class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfile: false
    };
  }

  toggleProfile(value) {
    this.setState({showProfile: value});
  }

  render() {
    var classProfile = 'btn-group';
    if (this.state.showProfile) {
      classProfile += ' open';
    }
    return (
      <header id="header-navbar" className="content-mini content-mini-full">
          <ul className="nav-header pull-right">
              <li>
                  <div className={classProfile}>
                      <button className="btn btn-default dropdown-toggle" type="button" onClick={this.toggleProfile.bind(this, !this.state.showProfile)}>
                          <i className="fa fa-user pull-left text-primary"></i>
                          <span className="caret"></span>
                      </button>
                      <ul className="dropdown-menu dropdown-menu-right">
                          <li className="dropdown-header">Profile {this.props.user.username}</li>
                          <li>
                              <a tabindex="-1" href="base_pages_inbox.html">
                                  <i className="si si-envelope-open pull-right"></i>
                                  <span className="badge badge-primary pull-right">0</span>Inbox
                              </a>
                          </li>
                          <li>
                              <a tabindex="-1" href="base_pages_profile.html">
                                  <i className="si si-user pull-right"></i>
                                  Profile
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
                              <a href="" onClick={this.props.onLogOut}>
                                <i className="si si-logout pull-right"></i>Log out
                              </a>
                          </li>
                      </ul>
                  </div>
              </li>
          </ul>
          <ul className="nav-header pull-left">
              <li className="hidden-xs hidden-sm">
                  <button className="btn btn-default" type="button" onClick={this.props.onClickSideBar}>
                      <i className="fa fa-ellipsis-v"></i>
                  </button>
              </li>
              <li className="visible-xs">
                  <button className="btn btn-default" data-toggle="className-toggle" data-target=".js-header-search" data-className="header-search-xs-visible" type="button">
                      <i className="fa fa-search"></i>
                  </button>
              </li>
              <li className="js-header-search header-search">
                  <form className="form-horizontal" action="base_pages_search.html" method="post">
                      <div className="form-material form-material-primary input-group remove-margin-t remove-margin-b">
                          <input className="form-control" type="text" id="base-material-text" name="base-material-text" placeholder="Search.." />
                          <span className="input-group-addon"><i className="si si-magnifier"></i></span>
                      </div>
                  </form>
              </li>
          </ul>
      </header>
    )
  }
});
