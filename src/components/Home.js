import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';
import ListStore from '../stores/ListStore.js';
import ListService from '../services/ListService.js';
import List from './List';
import Task from './Task';
import Header from './Header';

export default AuthenticatedComponent(class Home extends React.Component {
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
      list: ListStore.list,
      selectingList: null,
      showSideBar: true
    };
  }

  select(list) {
    this.setState({selectingList: list});
  }

  toggleSideBar(value) {
    this.setState({showSideBar: value});
  }

  render() {
    var task;

    if (this.state.selectingList) {
			task = (
				<Task task={this.state.selectingList.tasks}/>
			);
		}

    var classSideBar = 'sidebar-l sidebar-o side-scroll header-navbar-fixed';
    if (!this.state.showSideBar) {
      classSideBar += ' sidebar-mini';
    }

    return (
      <div id="page-container" className={classSideBar}>
        <nav id="sidebar">
            <div id="sidebar-scroll">
                <div className="sidebar-content">
                    <div className="side-header side-content bg-white-op">
                        <button className="btn btn-link text-gray pull-right hidden-md hidden-lg" type="button" data-toggle="layout" data-action="sidebar_close">
                            <i className="fa fa-times"></i>
                        </button>
                        <a className="h5 text-white" href="index.html">
                            <i className="fa fa-check-square text-primary"></i> <span className="h5 font-w600 sidebar-mini-hide">brain</span>
                        </a>
                    </div>
                    <div className="side-content">
                      <ul className="nav-main">
                        <li>
                            <a className="active" href="index.html"><i className="si si-speedometer"></i><span className="sidebar-mini-hide">Dashboard {this.props.user.username}</span></a>
                        </li>
                        <li className="nav-main-heading"><span className="sidebar-mini-hide">List</span></li>
                        {
                          Object.keys(this.state.list).map(function (key) {
                            var list = this.state.list[key];
                            return (
                              <List list={list} onClick={this.select.bind(this, list)} />
                            );
                          }, this)
                        }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        <Header onClick={this.toggleSideBar.bind(this, !this.state.showSideBar)} />
        {task}
      </div>
    );
  }
});
