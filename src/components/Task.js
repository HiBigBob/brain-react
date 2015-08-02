import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';
import TaskStore from '../stores/TaskStore.js';
import TaskService from '../services/TaskService.js';

var OneTask = React.createClass({
  render() {
    return (
      <tr>
          <td className="text-center">
              <label className="css-input css-checkbox css-checkbox-primary">
                  <input type="checkbox"><span></span>
              </label>
          </td>
          <td className="hidden-xs font-w600">Eugene Burke</td>
          <td>
              <a className="font-w600" data-toggle="modal" data-target="#modal-message" href="#">Your subscription was updated</a>
              <div className="text-muted push-5-t">We are glad you decided to go with a vip..</div>
          </td>
          <td className="visible-lg text-muted">
              <i className="fa fa-paperclip"></i> (2)
          </td>
          <td className="visible-lg text-muted">
              <em>10 min ago</em>
          </td>
      </tr>
    );
  }
});

export default AuthenticatedComponent(class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getTaskState();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    if (!this.state.task) {
      this.getTask();
    }

    TaskStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    TaskStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(this.getTaskState());
  }

  getList() {
    TaskService.getTask();
  }

  getTaskState() {
    return {
      list: ListStore.list
    };
  }

  render() {
    var tasks = this.state.task;
    return (
      <main id="main-container">
          <div className="content">
              <div className="row">
                  <div className="col-sm-12 col-lg-12">
                      <div className="block">
                          <div className="block-header bg-gray-lighter">
                              <ul className="block-options">
                                  <li>
                                      <button className="js-tooltip" title="Previous 15 Messages" type="button" data-toggle="block-option"><i className="si si-arrow-left"></i></button>
                                  </li>
                                  <li>
                                      <button className="js-tooltip" title="Next 15 Messages" type="button" data-toggle="block-option"><i className="si si-arrow-right"></i></button>
                                  </li>
                                  <li>
                                      <button type="button" data-toggle="block-option" data-action="refresh_toggle" data-action-mode="demo"><i className="si si-refresh"></i></button>
                                  </li>
                                  <li>
                                      <button type="button" data-toggle="block-option" data-action="fullscreen_toggle"></button>
                                  </li>
                              </ul>
                              <div className="block-title text-normal">
                                  <strong>15-30</strong> <span className="font-w400">from</span> <strong>700</strong>
                              </div>
                          </div>
                          <div className="block-content">
                              <div className="push">
                                  <button className="btn btn-default pull-right" type="button"><i className="fa fa-times text-danger push-5-l push-5-r"></i> <span className="hidden-xs">Delete</span></button>
                                  <div className="btn-group">
                                      <button className="btn btn-default" type="button"><i className="fa fa-archive text-primary push-5-l push-5-r"></i> <span className="hidden-xs">Archive</span></button>
                                      <button className="btn btn-default" type="button"><i className="fa fa-star text-warning push-5-l push-5-r"></i> <span className="hidden-xs">Star</span></button>
                                  </div>
                              </div>
                              <div className="pull-r-l">
                                  <table className="js-table-checkable table table-hover table-vcenter">
                                      <tbody>
                                        {
                                          Object.keys(tasks).map(function (key) {
                                            var task = tasks[key];
                                            return (
                                              <OneTask task={task} />
                                            );
                                          })
                                        }
                                      </tbody>
                                  </table>
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
