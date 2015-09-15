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
      selectedCategory: null,
      showSideBar: true,
      search: '',
      showToday: true
    };
  }

  select(category) {
    this.setState({selectedCategory: category});
  }

  toggleSideBar(value) {
    this.setState({showSideBar: value});
  }

  toggleSearch(value) {
    this.setState({search: value});
  }

  toggleToday(value) {
    this.setState({showToday: value});
  }

  render() {
    var task;
    var categoryId;
    if (this.state.selectedCategory) {
      categoryId = this.state.selectedCategory._id;
    }

    if (this.state.task) {
			task = (
				<Task
        task={this.state.task}
        search={this.state.search}
        category={this.state.category ? this.state.category : null}
        selectedCategory={this.state.selectedCategory}
        today={this.state.showToday}
        />
			);
		}

    var classSideBar = 'sidebar-l sidebar-o side-scroll header-navbar-fixed';
    if (!this.state.showSideBar) {
      classSideBar += ' sidebar-mini';
    }

    var shownCategory;
    if (this.state.category) {
      shownCategory = Object.keys(this.state.category).map(function (key) {
        var category = this.state.category[key];
        var active = this.state.selectedCategory && this.state.selectedCategory._id == category._id ? true : false;

        return (
          <Category category={category} onClick={this.select.bind(this, category)} activeCategory={active} />
        );
      }, this);
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
                        <i className="fa fa-check-square text-primary"></i> <span className="h5 font-w600 text-white sidebar-mini-hide push-5-l">brain</span>
                    </div>
                    <div className="side-content">
                      <ul className="nav-main">
                        <li className="nav-main-heading"><span className="sidebar-mini-hide">Dashboard {this.props.user ? this.props.user.username : ''}</span></li>
                        <li onClick={this.toggleToday.bind(this, true)}>
                            <a className={this.state.showToday ? 'active' : ''} href="#">
                              <i className="fa fa-calendar-o"></i><span className="sidebar-mini-hide">Today</span>
                            </a>
                        </li>
                        <li onClick={this.toggleToday.bind(this, false)}>
                            <a className={!this.state.showToday ? 'active' : ''} href="#">
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
                        { shownCategory }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        <Header
          onClickSideBar={this.toggleSideBar.bind(this, !this.state.showSideBar)}
          onSearch={this.toggleSearch.bind(this)}
        />
        {task}
      </div>
    </div>
    );
  }
});
