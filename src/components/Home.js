import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';
import CategoryStore from '../stores/CategoryStore.js';
import CategoryService from '../services/CategoryService.js';
import TaskStore from '../stores/TaskStore.js';
import TaskService from '../services/TaskService.js';
import Category from './Category';
import Task from './Task';
import Header from './Header';

export default AuthenticatedComponent(class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getState();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    if (!this.state.category) {
      this.getCategory();
    }
    if (!this.state.task) {
      this.getTask();
    }

    CategoryStore.addChangeListener(this._onChange);
    TaskStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    CategoryStore.removeChangeListener(this._onChange);
    TaskStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(this.getState());
  }

  getCategory() {
    CategoryService.getCategory();
  }

  getTask() {
    TaskService.getTask();
  }

  getState() {
    return {
      category: CategoryStore.category,
      task: TaskStore.task,
      selectingCategory: null,
      showSideBar: true,
      search: ''
    };
  }

  select(category) {
    this.setState({selectingCategory: category});
  }

  toggleSideBar(value) {
    this.setState({showSideBar: value});
  }

  toggleSearch(value) {
    this.setState({search: value});
  }

  render() {
    var task;
    var categoryId;
    if (this.state.selectingCategory) {
      categoryId = this.state.selectingCategory._id;
    }

    if (this.state.task) {
			task = (
				<Task
        task={this.state.task}
        search={this.state.search}
        category={this.state.category}
        categoryId={categoryId}
        />
			);
		}

    var classSideBar = 'sidebar-l sidebar-o side-scroll header-navbar-fixed';
    if (!this.state.showSideBar) {
      classSideBar += ' sidebar-mini';
    }

    return (
    <div>
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
                        <li className="nav-main-heading"><span className="sidebar-mini-hide">Dashboard {this.props.user.username}</span></li>
                        <li>
                            <a className="" href="#">
                              <i className="fa fa-calendar-o"></i><span className="sidebar-mini-hide">Today</span>
                            </a>
                        </li>
                        <li>
                            <a className="" href="#">
                              <i className="fa fa-calendar-plus-o"></i><span className="sidebar-mini-hide">Week</span>
                            </a>
                        </li>
                        <li>
                            <a className="" href="#">
                              <i className="fa fa-calendar"></i><span className="sidebar-mini-hide">All</span>
                            </a>
                        </li>
                        <li className="nav-main-heading"><span className="sidebar-mini-hide">Category</span></li>
                        <li onClick={this.select.bind(this, null)}>
                          <a href="#">
                            <i className="fa fa-bars fa-fw" />
                            <span className="sidebar-mini-hide">All</span>
                          </a>
                        </li>
                        {
                          Object.keys(this.state.category).map(function (key) {
                            var category = this.state.category[key];
                            return (
                              <Category category={category} onClick={this.select.bind(this, category)} />
                            );
                          }, this)
                        }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        <Header
          user={this.state.user}
          onClickSideBar={this.toggleSideBar.bind(this, !this.state.showSideBar)}
          onSearch={this.toggleSearch.bind(this)}
        />
        {task}
      </div>
    </div>
    );
  }
});
