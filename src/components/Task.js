import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';
import TaskStore from '../stores/TaskStore.js';
import TaskService from '../services/TaskService.js';
import MarkDown from './MarkDown';
import DropDown from './DropDown';

var OneTask = React.createClass({
  render() {
    return (
      <li>
          <div className="list-timeline-time">
            12 hrs ago
          </div>
          <i className="fa fa-shopping-cart fa-fw list-timeline-icon bg-success">
          </i>
          <div className="list-timeline-content">
              <label className="css-input css-checkbox css-checkbox-primary pull-right push-100-r">
                <input type="checkbox" /><span></span>
              </label>
              <p className="font-w600">{this.props.task.name}</p>
              <p className="font-s13">
                <MarkDown text={this.props.task.description} />
              </p>
          </div>
      </li>
    );
  }
});

export default AuthenticatedComponent(class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdd: false,
      name: '',
      description: '',
      filter: {
        active: true,
        completed: true
      }
    };
  }

  toggleBlock(value) {
    this.setState({showBlock: value});
  }

  toggleFilter(active, completed) {
    this.setState(
      {
        filter: {
          active: active,
          completed: completed
        }
      });
  }

  toggleAdd(value) {
    this.setState({showAdd: value});
  }

  handleTitleChange(event) {
    this.setState({name: event.target.value});
  }

  handleDescriptionChange(event) {
    this.setState({description: event.target.value});
  }

  addTask(e) {
    e.preventDefault();
    TaskService.addTask(this.props.categoryId, this.state.name, this.state.description)
    .catch(function(err) {
      alert("There's an error adding task");
      console.log("Error adding task", err);
    });
  }

  render() {

    var classAdd = 'display-none';
    if (this.state.showAdd) {
      classAdd = 'display-block list list-timeline';
    }

    var classFilter = "fa text-primary push-5-l push-5-r";
    var classFilterAll = classFilter;
    if (this.state.filter.completed == this.state.filter.active) {
      classFilterAll += " fa-check-square-o";
    } else {
      classFilterAll += " fa-square-o";
    }

    var classFilterActive = classFilter;
    if (this.state.filter.active) {
      classFilterActive += " fa-check-square-o";
    } else {
      classFilterActive += " fa-square-o";
    }

    var classFilterCompleted = classFilter;
    if (this.state.filter.completed) {
      classFilterCompleted += " fa-check-square-o";
    } else {
      classFilterCompleted += " fa-square-o";
    }

    var nbTask = this.props.task.length;

    var shownTask = Object.keys(this.props.task).filter(function (key) {
      var task = this.props.task[key];

      if (this.props.search && (task.name.toLowerCase().indexOf(this.props.search) === -1 && task.description.toLowerCase().indexOf(this.props.search) === -1)) {
          return;
      }

      var completed;
      if (this.state.filter.active && this.state.filter.completed) {

      } else if (this.state.filter.active) {
        completed = false;
      } else if (this.state.filter.completed) {
        completed = true;
      }

      if (this.props.categoryId && typeof completed !== 'undefined') {
        return task.categoryId == this.props.categoryId && task.completed == completed;
      }

      if (this.props.categoryId) {
        return task.categoryId == this.props.categoryId;
      }

      if (typeof completed !== 'undefined') {
        return task.completed == completed;
      }

      return task;
    }, this);

    var nbShownTask = shownTask.length;

    return (
      <main id="main-container">
          <div className="content bg-gray-lighter">
              <div className="row items-push">
                  <div className="col-sm-7">
                      <h1 className="page-heading">
                          Today <small> lets go. {nbShownTask} / {nbTask}</small>
                      </h1>
                  </div>
              </div>
          </div>
          <div className="content">
              <div className="row">
                  <div className="col-sm-12 col-lg-12">
                      <div className="block block-themed">
                          <div className="block-content">
                              <div className="push">
                                  <div className="btn-group">
                                      <button className="btn btn-default btn-xs push-50-r push-20-l" type="button" onClick={this.toggleAdd.bind(this, !this.state.showAdd)}><i className="fa fa-plus fa-fw"></i></button>
                                      <button className="btn btn-default btn-xs" type="button" onClick={this.toggleFilter.bind(this, true, true)}><i className={classFilterAll}></i> <span className="hidden-xs">All</span></button>
                                      <button className="btn btn-default btn-xs" type="button" onClick={this.toggleFilter.bind(this, !this.state.filter.active, this.state.filter.completed)}><i className={classFilterActive}></i> <span className="hidden-xs">Active</span></button>
                                      <button className="btn btn-default btn-xs" type="button" onClick={this.toggleFilter.bind(this, this.state.filter.active, !this.state.filter.completed)}><i className={classFilterCompleted}></i> <span className="hidden-xs">Completed</span></button>
                                  </div>
                              </div>
                              <div className="pull-r-l">
                                  <div className={classAdd}>
                                      <i className="fa fa-plus fa-fw list-timeline-icon bg-gray">
                                      </i>
                                      <div className="list-timeline-content">
                                          <div className="pull-right push-100-r push-50-t">
                                            <button type="button" className="btn btn-primary btn-xs" onClick={this.addTask.bind(this)}>
                                              <i className="fa fa-check bg-primary" />
                                            </button>
                                          </div>
                                          <p className="font-w600 form-material">
                                            <input className="form-control form-brain-title" onChange={this.handleTitleChange.bind(this)} type="text" placeholder="Title " />
                                          </p>
                                          <p className="font-s13 form-material">
                                            <textarea rows="2" className="form-control form-brain-description" onChange={this.handleDescriptionChange.bind(this)} type="text" placeholder="Title " />
                                          </p>
                                          <DropDown list={this.props.category} label={"Choose one"} />
                                      </div>
                                  </div>
                                  <ul className="list list-timeline pull-t">
                                  {
                                    shownTask.map(function (key) {
                                      var task = this.props.task[key];
                                      return (
                                        <OneTask task={task} />
                                      );
                                    }, this)
                                  }
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </main>
    )
  }
});
