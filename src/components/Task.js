import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';
import TaskStore from '../stores/TaskStore.js';
import TaskService from '../services/TaskService.js';

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
              <p className="font-s13">{this.props.task.description}</p>
          </div>
      </li>
    );
  }
});

export default AuthenticatedComponent(class Task extends React.Component {
  render() {
    var nbTask = this.props.task.length;
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
