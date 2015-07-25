import alt from '../utils/alt';
import axios from 'axios';

class AuthActions {
  constructor() {
    this.generateActions('logout', 'loadLocalUser');
  }
  async login(data) {
    try {
      console.log('login');
      const response = await axios.post('http://localhost:3000/authenticate', data);
      this.dispatch({ok: true, user: response.data});
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
    return !!localStorage.brain.token;
  }
}

module.exports = (alt.createActions(AuthActions));
