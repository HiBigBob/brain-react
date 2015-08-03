import {TASK_GET} from '../constants/TaskConstants';
import {LOGOUT_USER} from '../constants/LoginConstants';
import BaseStore from './BaseStore';

class TaskStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._list = '';
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case TASK_GET:
        this._list = action.list;
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

export default new TaskStore();
