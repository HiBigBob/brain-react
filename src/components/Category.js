import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';

export default AuthenticatedComponent(class Category extends React.Component {
  render() {
    return (
      <li onClick={this.props.onClick}>
        <a href="#">
          <i className={this.props.category.class} />
          <span className="sidebar-mini-hide">{this.props.category.name}</span>
        </a>
      </li>
    );
  }
});
