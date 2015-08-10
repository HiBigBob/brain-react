import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';
import TaskStore from '../stores/TaskStore.js';
import TaskService from '../services/TaskService.js';
import MarkDown from './MarkDown';


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
      showBlock: true,
      name: '',
      description: '',
      showAdd: false
    };
  }

  toggleBlock(value) {
    this.setState({showBlock: value});
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

  addTask(event) {
    console.log("add");
    console.log(this.state.name);
  }

  render() {
    var classBlock = 'block block-themed';
    var classIconBlock = 'text-default-lighter fa-lg fa';
    if (!this.state.showBlock) {
      classBlock += ' block-opt-hidden';
      classIconBlock += ' fa-caret-square-o-down';
    } else {
      classIconBlock += ' fa-caret-square-o-up';
    }

    var classAdd = 'display-none';
    var classAddLink = 'display-block';
    if (this.state.showAdd) {
      classAdd = 'display-block';
      classAddLink = 'display-none';
    }

    var nbTask = this.props.task.length;

    return (
      <main id="main-container">
          <div className="content bg-gray-lighter">
              <div className="row items-push">
                  <div className="col-sm-7">
                      <h1 className="page-heading">
                          Task <small> lets go.</small>
                      </h1>
                  </div>
                  <div className="col-sm-5 text-right hidden-xs">
                      <ol className="breadcrumb push-10-t">
                          <li>List</li>
                          <li><a className="link-effect" href="">Task</a></li>
                      </ol>
                  </div>
              </div>
          </div>
          <div className="content">
              <div className="row">
                  <div className="col-sm-12 col-lg-12">
                      <div className={classBlock}>
                          <div className="block-header bg-primary">
                              <ul className="block-options">
                                  <li>
                                      <button type="button" onClick={this.toggleBlock.bind(this, !this.state.showBlock)}><i className={classIconBlock}></i></button>
                                  </li>
                              </ul>
                              <div className="block-title text-normal">
                                  <strong>{nbTask}</strong> <span className="font-w400">tasks</span>
                              </div>
                          </div>
                          <div className="block-content">
                              <div className="push">
                                  <div className="btn-group">
                                      <button className="btn btn-default btn-xs" type="button"><i className="fa fa-square-o text-primary push-5-l push-5-r"></i> <span className="hidden-xs">Active</span></button>
                                      <button className="btn btn-default btn-xs" type="button"><i className="fa fa-check-square-o text-primary push-5-l push-5-r"></i> <span className="hidden-xs">Completed</span></button>
                                  </div>
                              </div>
                              <div className="pull-r-l">
                                  <ul className="list list-timeline pull-t">
                                  {
                                    Object.keys(this.props.task).map(function (key) {
                                      var task = this.props.task[key];
                                      return (
                                        <OneTask task={task} />
                                      );
                                    }, this)
                                  }
                                  <li className={classAdd}>
                                      <div className="list-timeline-time">
                                      </div>
                                      <i className="fa fa-plus fa-fw list-timeline-icon bg-primary">
                                      </i>
                                      <div className="list-timeline-content">
                                          <p className="font-w600 form-material">
                                          <input className="form-control form-brain-title" onChange={this.handleTitleChange} type="text" placeholder="Title " />
                                          </p>
                                          <p className="font-s13 form-material">
                                          <textarea rows="2" className="form-control form-brain-description" onChange={this.handleDescriptionChange} type="text" placeholder="Title " />
                                          </p>
                                          <div className="push-400-l">
                                            <button type="button" className="btn btn-primary btn-xs" onClick={this.addTask}>
                                              Add
                                            </button>
                                            <button type="button" className="btn btn-default btn-xs" onClick={this.toggleAdd.bind(this, !this.state.showAdd)}>
                                              Cancel
                                            </button>
                                          </div>
                                      </div>
                                  </li>
                                  <li className={classAddLink}>
                                    <div className="list-timeline-time">
                                    </div>
                                    <i className="fa fa-plus fa-fw list-timeline-icon bg-default">
                                    </i>
                                    <div className="list-timeline-content">
                                        <label className="css-input css-checkbox css-checkbox-primary pull-right push-100-r">
                                          <input type="checkbox" /><span></span>
                                        </label>
                                        <p className="font-w600 ">
                                          <button type="button" className="btn btn-default btn-xs" onClick={this.toggleAdd.bind(this, !this.state.showAdd)}>
                                            Add task
                                          </button>
                                        </p>
                                    </div>
                                  </li>
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
