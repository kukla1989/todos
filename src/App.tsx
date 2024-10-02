import React from 'react';
import './style/App.scss';
import { Todos } from './components/Todos/Todos';

export const App: React.FC = () => {
  return (
    <div className="app">
      <Todos />
    </div>
  );
};
