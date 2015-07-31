import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent'
import Sidebar from './Sidebar';

export default AuthenticatedComponent(class Home extends React.Component {
  render() {
    return (
      <div id="page-container" className="sidebar-l sidebar-o side-scroll header-navbar-fixed">
        <Sidebar user={this.props.user} />
      </div>
    );
  }
});
