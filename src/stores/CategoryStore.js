import {CATEGORY_GET} from '../constants/CategoryConstants';
import {LOGOUT_USER} from '../constants/LoginConstants';
import BaseStore from './BaseStore';

class CategoryStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._category = '';
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case CATEGORY_GET:
        this._category = action.category;
        this.emitChange();
        break;
      case LOGOUT_USER:
        this._category = null;
        this.emitChange();
        break;
      default:
        break;
    };
  }

  get category() {
    return this._category;
  }
}

export default new CategoryStore();
