import request from 'reqwest';
import when from 'when';
import {LIST_URL} from '../constants/ListConstants';
import ListActions from '../actions/ListActions';
import LoginStore from '../stores/LoginStore.js';

class ListService {

  getList() {
    request({
      url: LIST_URL,
      method: 'GET',
      headers: {
        'x-access-token': LoginStore.jwt
      }
    })
    .then(function(response) {
      ListActions.getList(response);
    });
  }

}

export default new ListService()
