import {TASK_GET, TASK_ADD, TASK_CHECK} from '../constants/TaskConstants';
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
        if (this._task !== '') {
          this._tmp = JSON.parse(JSON.stringify(this._task));
          this._tmp.push(action.task)
          this._task = this._tmp;
        } else {
          this._task = action.task;
        }
        this.emitChange();
        break;
      case TASK_CHECK:
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
