import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';
import ListStore from '../stores/ListStore.js';
import ListService from '../services/ListService.js';

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
    return (
      <li className="nav-main-heading"><span className="sidebar-mini-hide">List</span></li>
    );
  }
});
