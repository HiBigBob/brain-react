import React from 'react';

export default class DropDown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listVisible: false,
      selected: ''
    }
  }

	select(item) {
    this.setState({ selected: item });
    console.log(this.state.selected);
	}

	show(value) {
		this.setState({ listVisible: value });
	}

	hide() {
		this.setState({ listVisible: false });
	}

	render() {
    var items = [];
    for (var i = 0; i < this.props.list.length; i++) {
      var item = this.props.list[i];
      items.push(
        <li onClick={this.select.bind(this, item)}>
            <a href="#">
              <i className={ item.class }></i>
              <span className="push-10-l">{item.name}</span>
            </a>
        </li>
      );
    }

    return (
        <div className={"btn-group" + (this.state.listVisible ? " open" : "")}>
          <button className="btn btn-default btn-xs dropdown-toggle" type="button" onClick={this.show.bind(this, !this.state.listVisible)}>
              {this.state.selected ? this.state.selected.name : this.props.label}
              <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
            {items}
          </ul>
        </div>
    );
	}
};
