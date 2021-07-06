import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { VscClearAll } from 'react-icons/vsc';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo, clearTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: '',
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div className="icons">
        <BiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className="edit-icon"
        />

        <AiOutlineDelete
          onClick={() => removeTodo(todo.id)}
          className="delete-icon"
        />

        <VscClearAll
          onClick={() => clearTodo(todo.id)}
          className="clear-icon"
        />
      </div>
    </div>
  ));
};

export default Todo;