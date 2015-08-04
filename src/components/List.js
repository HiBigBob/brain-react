import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';

export default AuthenticatedComponent(class List extends React.Component {

  handleClick() {
    this.props.onClick();
  }

  render() {
    return (
      <li onClick={this.handleClick}>
        <a className="nav-submenu" data-toggle="nav-submenu" href="#"><span className="sidebar-mini-hide">{this.props.list.name}</span></a>
      </li>
    );
  }
});
