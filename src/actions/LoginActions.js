import AppDispatcher from '../dispatchers/AppDispatcher';
import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants';
import RouterContainer from '../services/RouterContainer'

export default {
  loginUser: (auth) => {
    var savedJwt = localStorage.getItem('jwt');

    if (savedJwt !== auth.access_token.token) {
      var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/';

      RouterContainer.get().transitionTo(nextPath);
      localStorage.setItem('jwt', auth.access_token.token);
      localStorage.setItem('brain', JSON.stringify(auth));
    }

    AppDispatcher.dispatch({
      actionType: LOGIN_USER,
      auth: auth
    });
  },
  logoutUser: () => {
    RouterContainer.get().transitionTo('/login');
    localStorage.removeItem('jwt');
    AppDispatcher.dispatch({
      actionType: LOGOUT_USER
    });
  }
}
