import React from 'react';
import DeleteSVG from '../../style/SVGs/DeleteSVG';

function transformDate(date: Date) {
  const timeString = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });

  return `${timeString} ${day} ${month}`;
}

interface TodoInterface {
  task: string;
  isComplete: boolean;
  toggleIsCompleted: () => void;
  deleteTodo: () => void;
  date: Date;
}

const Todo: React.FC<TodoInterface> = ({
  task,
  isComplete,
  date,
  toggleIsCompleted,
  deleteTodo,
}) => {
  return (
    <div className="todo">
      <div className="todo__left">
        <input
          name="checkbox"
          type="checkbox"
          value="yes"
          checked={isComplete}
          onChange={toggleIsCompleted}
          className="todo__is-complete"
        />

        <div className="todo__task-date">
          <p
            className={`todo__info${
              isComplete ? ' todo__info--completed' : ''
            }`}
          >
            {task}
          </p>

          <div className="todo__date">{transformDate(date)}</div>
        </div>
      </div>

      <div className="todo__tools">
        <DeleteSVG deleteTodo={deleteTodo} />
      </div>
    </div>
  );
};

export default Todo;
