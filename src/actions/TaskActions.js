import AppDispatcher from '../dispatchers/AppDispatcher';
import {TASK_GET, TASK_ADD} from '../constants/TaskConstants';

export default {
  getTask: (task) => {
    AppDispatcher.dispatch({
      actionType: TASK_GET,
      task: task
    })
  },
  addTask: (task) => {
    AppDispatcher.dispatch({
      actionType: TASK_ADD,
      task: task
    })
  }
}
