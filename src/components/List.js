import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';

export default AuthenticatedComponent(class List extends React.Component {
  render() {
    return (
      <li onClick={this.props.onClick}>
        <a href="#">{this.props.list.name}</a>
      </li>
    );
  }
});
