import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';

export default AuthenticatedComponent(class Category extends React.Component {
  render() {
    return (
      <li onClick={this.props.onClick}>
        <a href="#">{this.props.category.name}</a>
      </li>
    );
  }
});
