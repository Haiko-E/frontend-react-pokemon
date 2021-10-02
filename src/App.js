import React, { useState, useEffect } from 'react';
import './App.css';
import Button from './components/Button';
import Pokecard from './components/Pokecard';
import pokemonSVG from './assets/International_Pokémon_logo.svg';
import axios from 'axios';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [data, setData] = useState({});

  async function fetchData(link) {
    try {
      const result = await axios.get(link);
      setPokemons(result.data.results);
      setData(result);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData('https://pokeapi.co/api/v2/pokemon/');
    console.log('initiele render');
  }, []);

  const clickNext = () => {
    fetchData(data.data.next);
  };

  const clickPrev = () => {
    fetchData(data.data.previous);
  };

  const cardgenerator = () => {
    return (
      <div className='card-container'>
        {pokemons.map((pokemon) => {
          return (
            <Pokecard
              key={pokemon.name}
              url={pokemon.url}
            />
          );
        })}
      </div>
    );
  };
  if (!data.data) {
    return <h1>loading</h1>;
  }

  return (
    <div>
      <img
        src={pokemonSVG}
        alt='pokemon svg'
        style={{ margin: '0 auto', display: 'block' }}
      />
      <div className='container'>
        <Button
          disabled={data.data.previous}
          clickHandler={clickPrev}
        >
          Vorige
        </Button>
        <Button clickHandler={clickNext}>Volgende</Button>
      </div>

      {cardgenerator()}
    </div>
  );
}

export default App;
