import React from 'react';
import Router, {Route} from 'react-router';
import App from './components/App'
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import List from './components/List';
import RouterContainer from './services/RouterContainer';
import LoginActions from './actions/LoginActions';
import './style.css';

var routes = (
  <Route handler={App}>
    <Route name="login" handler={Login}/>
    <Route name="signup" handler={Signup}/>
    <Route name="home" path="/" handler={Home}/>
    <Route name="list" handler={List}/>
  </Route>
);

var router = Router.create({routes});
RouterContainer.set(router);

let brain = localStorage.getItem('brain');
if (brain) {
  LoginActions.loginUser(brain);
}

router.run(function (Handler) {
  React.render(<Handler />, document.body);
});
