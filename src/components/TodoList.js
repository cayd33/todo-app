import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log(...todos);
  };

  useEffect(() => {
    const data = localStorage.getItem('todo-list');
    if (data) {
      setTodos(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('todo-list', JSON.stringify(todos));
  });

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);
  };

  const clearTodo = (id) => {
    const clearTodo = [...todos].filter(
      (todo) => todo.id === id && todo.id !== id
    );

    setTodos(clearTodo);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>Your To Do List</h1>
      <h5 className="hover">
        <del>click text to mark it done</del>
      </h5>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        clearTodo={clearTodo}
      />
    </>
  );
}

export default TodoList;
