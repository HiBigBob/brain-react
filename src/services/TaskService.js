import request from 'reqwest';
import when from 'when';
import {TASK_URL} from '../constants/TaskConstants';
import TaskActions from '../actions/TaskActions';
import LoginStore from '../stores/LoginStore.js';
import CategoryService from '../services/CategoryService.js';

class TaskService {

  getTask() {
    request({
      url: TASK_URL,
      method: 'GET',
      headers: {
        'x-access-token': LoginStore.jwt
      }
    })
    .then(function(response) {
      TaskActions.getTask(response);
    });
  }

  addTask(categoryId, name, description) {
    return this.handleTask(when(request({
      url: TASK_URL,
      method: 'POST',
      type: 'json',
      headers: {
        'x-access-token': LoginStore.jwt
      },
      data: {
        categoryId, name, description
      }
    })));
  }

  handleTask(taskPromise) {
    return taskPromise
      .then(function(response) {
        TaskActions.addTask(response);
        return true;
      });
  }

}

export default new TaskService()
