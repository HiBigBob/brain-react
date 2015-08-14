import AppDispatcher from '../dispatchers/AppDispatcher';
import {CATEGORY_GET} from '../constants/CategoryConstants';

export default {
  getCategory: (category) => {
    AppDispatcher.dispatch({
      actionType: CATEGORY_GET,
      category: category
    })
  }
}
