import alt from '../utils/alt';
import {defer} from 'lodash';
import ListActions from '../actions/list-actions';

class ListStore {
  constructor() {
    this.bindActions(ListActions);
    this.lists = null;
    this.error = null;
  }
  saveList(data) {
    if (data.ok) {
      console.log(data.lists);
      this.storeList(data.lists);
    } else {
      this.error = data.error.message;
    }
  }
  storeList(lists) {
    console.log("storeList");
    console.log(lists);
    this.lists = lists;
    this.error = null;
  }
  onFetchAll(data) {
    this.saveList.bind(this)(data);
  }
}

module.exports = (alt.createStore(ListStore));
