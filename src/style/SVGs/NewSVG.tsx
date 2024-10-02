import React from 'react';

interface NewSVGInterface {
  switchShowNewTodo: () => void;
}

const NewSVG: React.FC<NewSVGInterface> = ({ switchShowNewTodo }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="71"
      height="71"
      fill="none"
      viewBox="0 0 71 71"
      className="newSVG"
      onClick={switchShowNewTodo}
    >
      <circle cx="35.172" cy="35.628" r="35.083" fill="#E53170"></circle>
      <path
        fill="#fff"
        d="M36.634 23.202a2.193 2.193 0 00-4.385 0v9.502h-9.502a2.193 2.193 0 000 4.386h9.502v9.501a2.193 2.193 0 004.385 0V37.09h9.502a2.193 2.193 0 000-4.386h-9.502v-9.502z"
      ></path>
    </svg>
  );
};

export default NewSVG;
