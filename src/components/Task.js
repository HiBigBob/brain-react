import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';
import TaskStore from '../stores/TaskStore.js';
import TaskService from '../services/TaskService.js';
import MarkDown from './MarkDown';
import DropDown from './DropDown';

var MainTask = class Task extends React.Component {
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
                  <em className="text-muted">{this.props.task.deadLineTime}</em>
              </td>
          </tr>
      </tbody>
    );
  }
};

var DescriptionTask = React.createClass({
  render() {
    return (
      <tbody className="table-brain-description">
          <tr>
              <td className="text-center">
              </td>
              <td className="font-w600">
                <MarkDown text={this.props.task.description} />
              </td>
              <td>
              </td>
              <td className="hidden-xs">
              </td>
          </tr>
      </tbody>
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
      date: '',
      categoryId: '',
      filter: {
        active: true,
        completed: false
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

  handleDateChange(event) {
    this.setState({date: event.target.value});
  }

  handleCategoryIdChange(value) {
    this.setState({categoryId: value});
  }

  addTask(e) {
    e.preventDefault();
    TaskService
      .addTask(this.state.categoryId, this.state.name, this.state.description)
      .catch(function(err) {
        alert("There's an error adding task");
        console.log("Error adding task", err);
      })
    ;
    React.findDOMNode(this.refs.title).value = '';
    React.findDOMNode(this.refs.description).value = '';
  }

  render() {

    var shownCategory = Object.keys(this.props.category).filter(function (key) {
      var category = this.props.category[key];

      return category._id == this.props.categoryId;
    }, this);

    var selectedCategoryObject;
    if (shownCategory.length > 0) {
      selectedCategoryObject = shownCategory.map(function (key) {
        var category = this.props.category[key];
        return {"class": category.class, "name": category.name};
      }, this)
    }

    var classAdd = 'display-none';
    if (this.state.showAdd) {
      classAdd = 'display-block bg-gray-light table-brain-add';
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

    var items = [];
    shownTask.map(function (key) {
      var task = this.props.task[key];
      items.push(
        <MainTask task={task} category={this.props.category} />
      );
      if (task.description.length > 0) {
        items.push(
          <DescriptionTask task={task} />
        );
      }
    }, this);


    return (
      <main id="main-container">
          <div className="content">
              <div className="row items-push">
                  <div className="col-sm-7">
                      <h1 className="page-heading">
                          Today <small> lets go. {nbShownTask} / {nbTask}</small>
                      </h1>
                  </div>
              </div>
              <div className="row">
                  <div className="col-sm-12 col-lg-12">
                      <div className="block block-themed">
                          <div className="block-content">
                              <div className="push">
                                  <div className="btn-group">
                                      <button className="btn btn-default btn-xs push-50-r push-30-l" type="button" onClick={this.toggleAdd.bind(this, !this.state.showAdd)}><i className="fa fa-plus fa-fw"></i></button>
                                      <button className="btn btn-default btn-xs" type="button" onClick={this.toggleFilter.bind(this, true, true)}><i className={classFilterAll}></i> <span className="hidden-xs">All</span></button>
                                      <button className="btn btn-default btn-xs" type="button" onClick={this.toggleFilter.bind(this, !this.state.filter.active, this.state.filter.completed)}><i className={classFilterActive}></i> <span className="hidden-xs">Active</span></button>
                                      <button className="btn btn-default btn-xs" type="button" onClick={this.toggleFilter.bind(this, this.state.filter.active, !this.state.filter.completed)}><i className={classFilterCompleted}></i> <span className="hidden-xs">Completed</span></button>
                                  </div>
                              </div>
                              <div className="pull-r-l">
                                  <div className={classAdd}>
                                    <div className="row padding-top-15">
                                      <div className="col-sm-6 col-lg-6">
                                        <p className="form-material ">
                                          <input className="form-control form-brain-title" onChange={this.handleTitleChange.bind(this)} type="text" placeholder="Title " ref="title" />
                                        </p>
                                      </div>
                                      <div className="col-sm-6 col-lg-6">
                                        <DropDown
                                          list={this.props.category}
                                          selected={this.handleCategoryIdChange.bind(this)}
                                          label={selectedCategoryObject ? selectedCategoryObject[0].name : 'Category'}
                                          class={selectedCategoryObject ? selectedCategoryObject[0].class : ''}
                                           />
                                        <p className="form-material ">
                                          <input className="form-control form-brain-date" onChange={this.handleDateChange.bind(this)} type="text" placeholder="Date " ref="date" />
                                        </p>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-sm-12 col-lg-12">
                                        <p className="font-s13 form-material">
                                          <textarea rows="5" className="form-control form-brain-description" onChange={this.handleDescriptionChange.bind(this)} type="text" placeholder="Description " ref="description" />
                                        </p>
                                      </div>
                                      <div className="col-sm-6 col-lg-6">
                                      </div>
                                    </div>
                                    <div className="row padding-bottom-15">
                                      <div className="col-sm-10 col-lg-10">
                                      </div>
                                      <div className="col-sm-2 col-lg-2">
                                        <button type="button" className="btn btn-primary btn-xs" onClick={this.addTask.bind(this)}>
                                          <i className="fa fa-check bg-primary" /> Add
                                        </button>
                                        <button type="button" className="btn btn-default btn-xs" onClick={this.toggleAdd.bind(this, !this.state.showAdd)}>
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                </div>
                                <table className="js-table-sections table table-hover table-brain">
                                  {items}
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
