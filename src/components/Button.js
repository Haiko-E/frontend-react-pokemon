import React from 'react';
import './Button.css';

function Button({ children, clickHandler, disabled }) {
  return (
    <button
      className='button'
      disabled={disabled === null}
      onClick={clickHandler}
      type='button'
    >
      {children}
    </button>
  );
}

export default Button;
