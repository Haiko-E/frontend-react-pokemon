import React, { useEffect, useState } from 'react';
import './Pokecard.css';
import Abilities from './Abilities';
import axios from 'axios';

function Pokecard({ url }) {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(url);
        setPokemon(result);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [url]);

  if (!pokemon.data) {
    return <h1>loading...</h1>;
  }

  return (
    <div className='pokecard'>
      <h1>{pokemon.data.name}</h1>
      <img
        src={pokemon.data.sprites.front_default}
        alt={pokemon.data.name}
      />
      <div>
        <b>Moves: </b> {pokemon.data.moves.length}
      </div>
      <div>
        {' '}
        <b>Weight: </b> {pokemon.data.weight}
      </div>
      <Abilities abilities={pokemon.data.abilities} />
    </div>
  );
}

export default Pokecard;
