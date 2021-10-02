import React from 'react';
import './Abilities.css';

function Abilities({ abilities }) {
  return (
    <div className='abilities'>
      <h4>Abilities</h4>
      {abilities &&
        abilities.map((ab) => (
          <div
            key={ab.ability.name}
            className='abilities-item'
          >
            {ab.ability.name}
          </div>
        ))}
    </div>
  );
}

export default Abilities;
