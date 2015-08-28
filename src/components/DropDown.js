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
          <button className="form-control form-brain-choose" type="button" onClick={this.show.bind(this, !this.state.listVisible)}>
              <span className="pull-left text-gray-dark">
                <i className="pull-right fa fa-angle-down padding-top-3"></i>
                <i className={this.state.selected ? this.state.selected.class : this.props.class}></i>
                <span className="push-10-l">{this.state.selected ? this.state.selected.name : this.props.label}</span>
              </span>
          </button>
          <ul className="dropdown-menu dropdown-menu-brain">
            {items}
          </ul>
        </div>
    );
	}
};
