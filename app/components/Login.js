'use strict';

import React from 'react';
import {Input, Button, Alert} from 'react-bootstrap';
import {changeHandler} from '../utils/component-utils';

import connectToStores from 'alt/utils/connectToStores';

import AuthStore from '../stores/auth-stores';
import AuthActions from '../actions/auth-actions';

@connectToStores
@changeHandler
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {}
    };
  }
  static contextTypes = {
    router: React.PropTypes.func
  }
  static propTypes = {
    error: React.PropTypes.string
  }
  static getStores() {
    return [AuthStore];
  }
  static getPropsFromStores() {
    return AuthStore.getState();
  }
  componentWillMount() {
    this.state = {
      login: {}
    };
  }
  register() {
    AuthActions.register(this.state.login);
  }
  login() {
    console.log('test');
    AuthActions.login(this.state.login);
  }
  render() {
    var error;
    if (this.props.error) {
      error = <Alert bsStyle="danger">{this.props.error}</Alert>;
    }
    return (
    <div className="content overflow-hidden">
        <div className="row">
            <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
                <div className="block block-themed animated fadeIn">
                    <div className="block-content block-content-full block-content-narrow">
                        <h1 className="h2 font-w600 push-30-t push-5">Brain</h1>
                        <p>Welcome, please login.</p>
                        <div className="js-validation-login form-horizontal push-30-t push-50" >
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <div className="form-material form-material-primary floating">
                                        <input
                                          className="form-control"
                                          type="text"
                                          id="username"
                                          name="username"
                                          value={this.state.login.username}
                                          onChange={this.changeHandler.bind(this, 'login', 'username')} />
                                        <label for="username">Username</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <div className="form-material form-material-primary floating">
                                        <input
                                          className="form-control"
                                          type="password"
                                          id="password"
                                          name="password"
                                          value={this.state.login.password}
                                          onChange={this.changeHandler.bind(this, 'login', 'password')} />
                                        <label for="password">Password</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12 col-sm-6 col-md-4">
                                    <button className="btn btn-block btn-primary" onClick={this.login.bind(this)}><i class="si si-login pull-right"></i> Log in</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}
