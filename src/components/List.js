import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';
import ListStore from '../stores/ListStore.js';
import ListService from '../services/ListService.js';

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
  constructor(props) {
    super(props);
    this.state = this.getListState();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    if (!this.state.list) {
      this.getList();
    }

    ListStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ListStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(this.getListState());
  }

  getList() {
    ListService.getList();
  }

  getListState() {
    return {
      list: ListStore.list
    };
  }

  render() {
    var lists = this.state.list;
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
