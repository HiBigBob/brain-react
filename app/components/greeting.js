import React from "react";
import {authDecorator} from '../utils/component-utils';

@authDecorator
export default class Greeting extends React.Component {
  render() {
    return (
      <div className="greeting">
        <h1>Hello, {this.props.name}!</h1>
      </div>
    );
  }
};
