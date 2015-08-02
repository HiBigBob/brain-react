import AppDispatcher from '../dispatchers/AppDispatcher';
import {TASK_GET} from '../constants/TaskConstants';

export default {
  getTask: (task) => {
    AppDispatcher.dispatch({
      actionType: TASK_GET,
      task: task
    })
  }
}
