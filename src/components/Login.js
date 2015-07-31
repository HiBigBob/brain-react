import React from 'react/addons';
import ReactMixin from 'react-mixin';
import Auth from '../services/AuthService'

export default class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    };
  }

  login(e) {
    e.preventDefault();
    Auth.login(this.state.username, this.state.password)
      .catch(function(err) {
        alert("There's an error logging in");
        console.log("Error logging in", err);
      });
  }

  render() {
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
                                        <input type="text" valueLink={this.linkState('username')} className="form-control" id="username"  />
                                        <label htmlFor="username">Username</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <div className="form-material form-material-primary floating">
                                        <input type="password" valueLink={this.linkState('password')} className="form-control" id="password" ref="password"  />
                                        <label htmlFor="password">Password</label>
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

ReactMixin(Login.prototype, React.addons.LinkedStateMixin);
