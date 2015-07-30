import {LIST_GET} from '../constants/ListConstants';
import {LOGOUT_USER} from '../constants/LoginConstants';
import BaseStore from './BaseStore';

class ListStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._list = '';
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case LIST_GET:
        this._list = action.list;
        this.emitChange();
        break;
      case LOGOUT_USER:
        this._list = null;
        this.emitChange();
        break;
      default:
        break;
    };
  }

  get list() {
    return this._list;
  }
}

export default new ListStore();
