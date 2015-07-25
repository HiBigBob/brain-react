import alt from '../utils/alt';
import {defer} from 'lodash';
import AuthActions from '../actions/auth-actions';
import router from '../utils/router';

const USER_STORAGE_KEY = 'brain';

class AuthStore {
  constructor() {
    this.bindActions(AuthActions);
    this.user = null;
    this.error = null;
  }
  saveUser(data) {
    if (data.ok) {
      console.log('okay !');
      this.storeUser(data.user);
      this.redirectToHome();
    }
    else {
      this.clearUser();
      this.error = data.error.message;
      this.redirectToLogin();
    }
  }
  storeUser(user) {
    this.user = user;
    this.error = null;
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }
  loadLocalUser() {
    if (!process.env.BROWSER) {
      return;
    }
    var user;
    try {
      user = JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
    } finally {
      if (user) {
        console.log('loadLocalUser');
        console.log(user);
        this.storeUser(user);
      }
    }
  }
  clearUser() {
    this.user = null;
    localStorage.removeItem(USER_STORAGE_KEY);
  }
  redirectToHome() {
    defer(router.transitionTo.bind(this, 'dashboard'));
  }
  redirectToLogin() {
    defer(router.transitionTo.bind(this, 'login'));
  }
  onLogin(data) {
    this.saveUser.bind(this)(data);
  }
  onRegister(data) {
    this.saveUser.bind(this)(data);
  }
  onLogout() {
    this.clearUser();
    this.redirectToLogin();
  }
}

module.exports = (alt.createStore(AuthStore));
