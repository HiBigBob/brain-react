import alt from '../utils/alt';
import axios from 'axios';

class AuthActions {
  constructor() {
    this.generateActions('logout', 'loadLocalUser');
  }
  async login(data) {
    try {
      console.log('login');
      console.log(data);
      // const response = await axios.post('/authenticate', data);
      // this.dispatch({ok: true, user: response.data});
      this.dispatch({ok: true, user: data});
    } catch (err) {
      console.error(err);
      this.dispatch({ok: false, error: err.data});
    }
  }
  async register(data) {
    try {
      const response = await axios.post('/auth/register', data);
      this.dispatch({ok: true, user: response.data});
    } catch (err) {
      console.error(err);
      this.dispatch({ok: false, error: err.data});
    }
  }
  getToken() {
    return localStorage.token;
  }
  loggedIn() {
    return !!localStorage.brain;
  }
}

module.exports = (alt.createActions(AuthActions));
