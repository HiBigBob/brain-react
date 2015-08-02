import request from 'reqwest';
import when from 'when';
import {TASK_URL} from '../constants/TaskConstants';
import TaskActions from '../actions/TaskActions';
import LoginStore from '../stores/LoginStore.js';

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

}

export default new TaskService()
