import request from 'reqwest';
import when from 'when';
import {CATEGORY_URL} from '../constants/CategoryConstants';
import CategoryActions from '../actions/CategoryActions';
import LoginStore from '../stores/LoginStore.js';

class CategoryService {

  getCategory() {
    request({
      url: CATEGORY_URL,
      method: 'GET',
      headers: {
        'x-access-token': LoginStore.jwt
      }
    })
    .then(function(response) {
      CategoryActions.getCategory(response);
    });
  }

}

export default new CategoryService()
