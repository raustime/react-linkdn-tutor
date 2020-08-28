import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import {getTodosLoading, getCompletedTodos, getIncompleteTodos} from './selectors';
import { loadTodos, removeTodoRequest, markTodoRequest } from "./thunks";

import TodoListItem from "./TodoListItem";
import NewTodoForm from "./NewTodoForm";

import "./TodoList.css";

const ListWraper=styled.div`
    max-width: 700px;
    margin: auto;
`;




const TodoList = ({
  inCompleteTodos,
  completedTodos,
  onRemovePressed,
  onMarkCompletePressed,
  isLoading,
  startLoadingTodos,
}) => {
  const [width, setWidth]=useState("600px");
  const [background, setBackground]=useState("white");
  const ListWraper2={
    maxWidth: `${width}`,
    margin: "auto",
    background: `${background}`
  }
  const handleClick = useCallback(() => {
    setWidth("1200px");
    setBackground("#FF0000");
  }, []);
  useEffect(() => {
    startLoadingTodos();
    console.log("loading");
  }, [startLoadingTodos]);
  const loadingMessage = <div>Loading...</div>;
  const content = (
    
    <div style={ListWraper2}>
      <button onClick={handleClick}>setWidth</button>
      <NewTodoForm />
      <h3>inComplete</h3>
      {inCompleteTodos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onRemovePressed={onRemovePressed}
          onMarkCompletePressed={onMarkCompletePressed}
        />
      ))}
      <h3>Completed</h3>
      {completedTodos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onRemovePressed={onRemovePressed}
          onMarkCompletePressed={onMarkCompletePressed}
        />
      ))}
    </div>
  );
  console.log('render');
  return isLoading ? loadingMessage : content;
};

const mapStateToProps = (state) => ({
  isLoading: getTodosLoading(state),
  inCompleteTodos: getIncompleteTodos(state),
  completedTodos: getCompletedTodos(state),
});

const mapDispatchToProps = (dispatch) => ({
  onRemovePressed: id => dispatch(removeTodoRequest(id)),
  onMarkCompletePressed: id => dispatch(markTodoRequest(id)),
  startLoadingTodos: () => dispatch(loadTodos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
