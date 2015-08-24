import React from 'react';

export default class DropDown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listVisible: false,
      selected: '',
      search: ''
    }
  }

	select(item) {
    this.setState({ selected: item });
    this.props.selected(item._id);
    this.setState({ listVisible: false });
	}

	show(value) {
		this.setState({ listVisible: value });
	}

  handleSearch(){
    this.setState({ search: this.refs.filterTextInput.getDOMNode().value.toLowerCase() });
  }

  componentDidUpdate() {
    React.findDOMNode(this.refs.filterTextInput).focus(); 
  }

	render() {
    var items = [];
    items.push(
      <li>
        <input className="form-control" type="text" placeholder="Search.." ref="filterTextInput" onChange={this.handleSearch.bind(this)} />
      </li>
    );

    var shownList = Object.keys(this.props.list).filter(function (key) {
      var list = this.props.list[key];

      if (this.state.search && (list.name.toLowerCase().indexOf(this.state.search) === -1)) {
          return;
      }

      return list;
    }, this);


    shownList.map(function (key) {
      var item = this.props.list[key];
      items.push(
        <li onClick={this.select.bind(this, item)} >
            <a href="#">
              <i className={ item.class }></i>
              <span className="push-10-l">{item.name}</span>
            </a>
        </li>
      );
    }, this);

    if (shownList.length == 0) {
      items.push(
        <li>
            <a href="#">
              <i className="fa fa-search"></i>
              <span className="push-10-l">No result</span>
            </a>
        </li>
      );
    }

    return (
        <div className={"btn-group form-material dropdown-brain" + (this.state.listVisible ? " open" : "")}>
          <button className="btn btn-default btn-xs dropdown-toggle form-control" type="button" onClick={this.show.bind(this, !this.state.listVisible)}>
              <span className="pull-left text-gray-dark push-70-r">{this.state.selected ? this.state.selected.name : this.props.label}</span>
              <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
            {items}
          </ul>
        </div>
    );
	}
};
