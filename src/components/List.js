import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';

var OneList = React.createClass({
  render() {
    return (
      <li>
        <a className="nav-submenu" data-toggle="nav-submenu" href="#"><span className="sidebar-mini-hide">{this.props.list.name}</span></a>
      </li>
    );
  }
});

export default AuthenticatedComponent(class List extends React.Component {
  render() {
    var lists = this.props.list;
    return (<ul className="nav-main">
      <li>
          <a className="active" href="index.html"><i className="si si-speedometer"></i><span className="sidebar-mini-hide">Dashboard {this.props.user.username}</span></a>
      </li>
      <li className="nav-main-heading"><span className="sidebar-mini-hide">List</span></li>
      {
        Object.keys(lists).map(function (key) {
          var list = lists[key];
          return (
            <OneList list={list} />
          );
        })
      }
      </ul>
    )
  }
});
