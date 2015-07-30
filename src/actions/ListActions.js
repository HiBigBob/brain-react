import AppDispatcher from '../dispatchers/AppDispatcher';
import {LIST_GET} from '../constants/ListConstants';

export default {
  getList: (list) => {
    AppDispatcher.dispatch({
      actionType: LIST_GET,
      list: list
    })
  }
}
