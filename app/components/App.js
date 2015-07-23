import Footer from 'components/Footer';
import Header from 'components/Header';
import MainSection from 'components/Main';
import React from 'react';
import TodoStore from 'stores/TodoStore';

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getTodoState() {
  return {
    allTodos: TodoStore.getState().todos,
    areAllComplete: TodoStore.areAllComplete()
  };
}

var TodoApp = React.createClass({
  mixins: [FluxyMixin],

  statics: {
    storeListeners: {
      _onChange: TodoStore
    }
  },

  getInitialState: function() {
    return getTodoState();
  },

  /**
   * @return {object}
   */
  render: function() {
  	return (
      <div>
        <Header />
        <Main
          allTodos={this.state.allTodos}
          areAllComplete={this.state.areAllComplete}
        />
        <Footer allTodos={this.state.allTodos} />
      </div>
  	);
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this.setState(getTodoState());
  }

});

module.exports = TodoApp;
