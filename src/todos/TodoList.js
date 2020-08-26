import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadTodos, removeTodoRequest, markTodoRequest } from "./thunks";

import TodoListItem from "./TodoListItem";
import NewTodoForm from "./NewTodoForm";

import "./TodoList.css";

const TodoList = ({
  todos = [],
  onRemovePressed,
  onMarkCompletePressed,
  isLoading,
  startLoadingTodos,
}) => {
  useEffect(() => {
    startLoadingTodos();
    console.log("loading");
  }, [startLoadingTodos]);
  const loadingMessage = <div>Loading...</div>;
  const content = (
    <div className="list-wrapper">
      <NewTodoForm />
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onRemovePressed={onRemovePressed}
          onMarkCompletePressed={onMarkCompletePressed}
        />
      ))}
    </div>
  );
  return isLoading ? loadingMessage : content;
};

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
  todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
  onRemovePressed: id => dispatch(removeTodoRequest(id)),
  onMarkCompletePressed: id => dispatch(markTodoRequest(id)),
  startLoadingTodos: () => dispatch(loadTodos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
