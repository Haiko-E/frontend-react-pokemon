import React, { useState, useEffect } from 'react';
import './App.css';
import Button from './components/Button';
import Pokecard from './components/Pokecard';
import pokemonSVG from './assets/International_Pokémon_logo.svg';
import axios from 'axios';

function App() {
  // twee states 1 voor het pokemon object, de ander voor het overkoepelende data object
  const [pokemons, setPokemons] = useState([]);
  const [data, setData] = useState({});

  // functie voor het verkrigjen van de 20 pokemon, en het overkoepelende data object om gebruik te maken van next en previous
  async function fetchData(link) {
    try {
      const result = await axios.get(link);
      setPokemons(result.data.results);
      setData(result);
    } catch (e) {
      console.log(e);
    }
  }

  // Mount voor het verkrijgen van de 1e pagina.
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

  // extra functie voor het genereren van content. hiermee blijft de return statement clean
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

  // wanneer er undefined is word er "loading" gegenereert
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
