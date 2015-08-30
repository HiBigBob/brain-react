import {TASK_GET, TASK_ADD} from '../constants/TaskConstants';
import BaseStore from './BaseStore';

class TaskStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._task = '';
    this._tmp = '';
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case TASK_GET:
        this._task = action.task;
        this.emitChange();
        break;
      case TASK_ADD:
        this._tmp = JSON.parse(JSON.stringify(this._task));
        this._tmp.push(action.task)
        this._task = this._tmp;
        this.emitChange();
        break;
      default:
        break;
    };
  }

  get task() {
    return this._task;
  }
}

export default new TaskStore();
