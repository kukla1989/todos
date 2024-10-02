import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';

import Todo from '../Todo/Todo';
import { TodoType } from '../../types';
import NewSVG from '../../style/SVGs/NewSVG';
import NewTodo from '../NewTodo/NewTodo';

function getTodosFromLocalStorage() {
  const storedTodos = localStorage.getItem('todos');

  if (storedTodos) {
    return JSON.parse(storedTodos).map((todo: TodoType) => ({
      ...todo,
      date: new Date(todo.date),
    }));
  }

  return [];
}

export const Todos = () => {
  const [todos, setTodos] = useState<TodoType[]>(getTodosFromLocalStorage());
  const [showNewTodo, setShowNewTodo] = useState(false);
  const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All');
  const [filteredTodos, setFilteredTodos] = useState<TodoType[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'status'>('date');

  const switchShowNewTodo = () => setShowNewTodo(!showNewTodo);

  const addTodo = (newTask: string) => {
    const newTodo: TodoType = {
      id: uuidv4(),
      task: newTask,
      isComplete: false,
      date: new Date(),
    };

    setTodos([newTodo, ...todos]);
    switchShowNewTodo();
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  const switchIsCompleted = (id: string) => {
    setTodos((prevtodos) =>
      prevtodos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    let updatedTodos = [...todos];

    switch (filter) {
      case 'Active':
        updatedTodos = todos.filter((todo) => !todo.isComplete);
        break;

      case 'Completed':
        updatedTodos = todos.filter((todo) => todo.isComplete);
        break;

      default:
        updatedTodos = todos;
        break;
    }

    updatedTodos.sort((a, b) => {
      if (sortBy === 'date') {
        return b.date.getTime() - a.date.getTime();
      }

      if (sortBy === 'status') {
        if (a.isComplete === b.isComplete) return 0;

        return a.isComplete ? 1 : -1;
      }

      return 0;
    });

    setFilteredTodos([...updatedTodos]);
  }, [filter, sortBy, todos]);

  return (
    <div className="todos">
      <div className="todos__filters">
        <button
          type="button"
          className={`todos__filter ${
            filter === 'All' ? 'todos__filter--active' : ''
          }`}
          onClick={() => setFilter('All')}
        >
          All
        </button>

        <button
          type="button"
          className={`todos__filter ${
            filter === 'Active' ? 'todos__filter--active' : ''
          }`}
          onClick={() => setFilter('Active')}
        >
          Active
        </button>

        <button
          type="button"
          className={`todos__filter ${
            filter === 'Completed' ? 'todos__filter--active' : ''
          }`}
          onClick={() => setFilter('Completed')}
        >
          Completed
        </button>
      </div>

      <div className="todos__sorting">
        <button
          type="button"
          className={`todos__filter ${
            sortBy === 'date' ? 'todos__filter--active' : ''
          }`}
          onClick={() => setSortBy('date')}
        >
          Sort by Date
        </button>

        <button
          type="button"
          className={`todos__filter ${
            sortBy === 'status' ? 'todos__filter--active' : ''
          }`}
          onClick={() => setSortBy('status')}
        >
          Sort by Status
        </button>
      </div>
      <h1 className="todos__title">To Do List</h1>
      {showNewTodo && <NewTodo addTodo={addTodo} />}

      {filteredTodos.map(({ id, task, isComplete, date }) => (
        <Todo
          task={task}
          isComplete={isComplete}
          date={date}
          toggleIsCompleted={() => switchIsCompleted(id)}
          deleteTodo={() => deleteTodo(id)}
          key={id}
        />
      ))}

      {todos.length === 0 && <p className="todos__empty">pls add todos</p>}

      <NewSVG switchShowNewTodo={switchShowNewTodo} />
    </div>
  );
};
