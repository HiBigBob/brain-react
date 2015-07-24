'use strict';

import React from 'react';
import {Input, Button, Alert} from 'react-bootstrap';
import {changeHandler} from '../utils/component-utils';

import connectToStores from 'alt/utils/connectToStores';

import LoginStore from '../stores/login-stores';
import LoginActions from '../actions/login-actions';

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
    return [LoginStore];
  }
  static getPropsFromStores() {
    return LoginStore.getState();
  }
  componentWillMount() {
    this.state = {
      login: {}
    };
  }
  register() {
    LoginActions.register(this.state.login);
  }
  login() {
    LoginActions.login(this.state.login);
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
                        <h1 className="h2 font-w600 push-30-t push-5">OneUI</h1>
                        <p>Welcome, please login.</p>
                        <form className="js-validation-login form-horizontal push-30-t push-50" action="index.html" method="post">
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <div className="form-material form-material-primary floating">
                                        <input className="form-control" type="text" id="login-username" name="login-username" />
                                        <label for="login-username">Username</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <div className="form-material form-material-primary floating">
                                        <input className="form-control" type="password" id="login-password" name="login-password" />
                                        <label for="login-password">Password</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <label className="css-input switch switch-sm switch-primary">
                                        <input type="checkbox" id="login-remember-me" name="login-remember-me" /><span></span> Remember Me?
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12 col-sm-6 col-md-4">
                                    <button className="btn btn-block btn-primary" type="submit"><i class="si si-login pull-right"></i> Log in</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}
