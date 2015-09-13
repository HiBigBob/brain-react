import React from 'react';
import TaskService from '../services/TaskService.js';

export default class MainTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      checked: false
    };
  }

  show(value) {
		this.setState({ open: value });
	}

  checked(value) {
    this.props.task.completed = value;
		this.setState({ checked: value });

    TaskService
      .checkTask(this.props.task._id, value)
    ;
	}

  render() {
    var date = new Date(this.props.task.deadLineTime);
    var shownCategory = Object.keys(this.props.category).filter(function (key) {
      var category = this.props.category[key];

      return category._id == this.props.task.categoryId;
    }, this);

    return (
      <tbody className={
        this.props.task.description ?
        "js-table-sections-header table-brain-content" + (this.state.open ? " open" : "")
        :
        'table-brain-content'
      } >
          <tr className="active">
              <td className="text-center check" >
                <label className="css-input css-checkbox css-checkbox-primary remove-margin-t remove-margin-b">
                    <input type="checkbox" id="check-all" name="check-all" checked={this.props.task.completed} onChange={this.checked.bind(this, !this.props.task.completed)} /><span></span>
                </label>
              </td>
              <td className="font-w600 content" onClick={this.show.bind(this, !this.state.open)}>
                {
                  this.props.task.description ?
                  <i className={"fa cursor push-10-r " + (this.state.open ? "fa-angle-down" : "fa-angle-right")}></i>
                  :
                  <i className={"fa cursor push-15-r"}></i>
                }
                {this.props.task.name}
              </td>
              <td>
                  {
                    shownCategory.map(function (key) {
                      var category = this.props.category[key];
                      return (
                        <i className={category.class}></i>
                      );
                    }, this)
                  }
              </td>
              <td className="hidden-xs date">
                  <em className="text-muted">{date.toDateString()}</em>
              </td>
          </tr>
      </tbody>
    );
  }
};
