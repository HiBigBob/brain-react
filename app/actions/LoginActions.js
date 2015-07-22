var alt = require('../alt');

class LoginActions {
  login(data) {
    this.dispatch({ok: true, user: response.data});
  },
  register(data) {
    this.dispatch({ok: true, user: response.data});
  }
}

module.exports = alt.createActions(LoginActions);
