import alt from '../utils/alt';
import axios from 'axios';
import config from '../config';
import AuthStores from '../stores/auth-stores';

class ListActions {
  async fetchAll() {
    try {
      console.log('fetchAll');
      const response = await axios.get(config.api_url + '/api/lists', { headers:{'x-access-token': AuthStores.getState().access_token.token}});
      this.dispatch({ok: true, lists: response.data});
    } catch (err) {
      console.error(err);
      this.dispatch({ok: false, error: err.data});
    }
  }
}

module.exports = (alt.createActions(ListActions));
