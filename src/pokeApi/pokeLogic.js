// src/PokemonList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './pokeStyle.css';

const PokemonList = () => {
  // State to store Pokemon data
  const [pokemon, setPokemon] = useState(null);
  // State to store Pokemon ID with a default value of 1
  const [pokemonId, setPokemonId] = useState(1);

  // useEffect is a hook that runs code after the component renders
  // It fetches Pokemon data when pokemonId changes
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        // Send a GET request to the PokeAPI using the current pokemonId
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);

        // Update the state with the received Pokemon data
        setPokemon(response.data);
        console.log(response.data); // Log the retrieved data to the console
      } catch (error) {
        // Handle errors during Pokemon data retrieval
        console.error('Error fetching Pokemon data:', error);
      }
    };

    // Call the fetchPokemon function when the component mounts and whenever pokemonId changes
    fetchPokemon();
  }, [pokemonId]); // Dependency array ensures the effect runs when pokemonId changes

  // Function to handle incrementing the Pokemon ID
  const incrementPokemonId = () => {
    setPokemonId((prevId) => prevId + 1);
  };

  // Function to handle decrementing the Pokemon ID, ensuring it doesn't go below 1
  const decrementPokemonId = () => {
    setPokemonId((prevId) => Math.max(prevId - 1, 1));
  };

  return (
    <main>
      <div className="pokedex-container">
        <h1 className="pokedex-header">Pokédex</h1>

        {/* Display Pokemon information if available */}
        {pokemon && (
          <div className="pokemon-info">
            <img className="pokemon-image" src={pokemon.sprites.front_default} alt={pokemon.name} />

            <ul className="pokemon-details">
              <li className='pokeName'><strong>Name:</strong> {pokemon.name.toUpperCase()}</li>
              <li className='pokeType'>
                <strong>Type:</strong>
                {/* Map through the types and display their names */}
                {pokemon.types.map((type, index) => (
                  <span key={index} className="pokemon-type"> {type.type.name} </span>
                ))}
              </li>
              <li className='pokeHeight d-inline me-2'><strong>Height:</strong> {pokemon.height} feet.</li>
              <li className='pokeWeight d-inline me-2'><strong>Weight:</strong> {pokemon.weight} lb.</li>
            </ul>

            {/* Input field for entering Pokemon ID */}
            <div className="pokedex-buttons pb-3">
              <button onClick={decrementPokemonId} className='me-3'><i class="fa-solid fa-arrow-left"></i></button>
              <button onClick={incrementPokemonId} className='ms-3'><i class="fa-solid fa-arrow-right"></i></button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default PokemonList;
