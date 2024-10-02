import React, { useState } from 'react';

interface NewTodoInterface {
  addTodo: (newTask: string) => void;
}

const NewTodo: React.FC<NewTodoInterface> = ({ addTodo }) => {
  const [newTodo, setnewTodo] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo) {
      addTodo(newTodo);
    }
  };

  return (
    <div className="new-todo" onSubmit={handleSubmit}>
      <form className="new-todo__form">
        <input
          type="text"
          className="new-todo__input"
          placeholder="write new todo here"
          onChange={(e) => setnewTodo(e.target.value)}
          value={newTodo}
        />

        <button type="submit" className="new-todo__submit">
          add task
        </button>
      </form>
    </div>
  );
};

export default NewTodo;
