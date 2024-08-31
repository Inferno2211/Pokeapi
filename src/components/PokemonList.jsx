import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokecard from './Pokecard';

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    const [prevUrl, setPrevUrl] = useState(null);
    const [loading, setLoading] = useState(false); // Add a loading state

    const fetchPokemons = async (url) => {
        setLoading(true); // Start loading
        try {
            const response = await axios.get(url);
            setPokemons(response.data.results);
            setNextUrl(response.data.next);
            setPrevUrl(response.data.previous);
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // Fetch initial data
    useEffect(() => {
        fetchPokemons(nextUrl);
    }, []);

    const handleNext = () => {
        if (nextUrl) {
            fetchPokemons(nextUrl);
        }
    };

    const handlePrev = () => {
        if (prevUrl) {
            fetchPokemons(prevUrl);
        }
    };

    return (
        <div className="pokemon-list">
            <div className="pagination-buttons">
                <button onClick={handlePrev} disabled={!prevUrl || loading}>Previous</button>
                <button onClick={handleNext} disabled={!nextUrl || loading}>Next</button>
            </div>
            
            <div className="cards-container">
                {pokemons.map((pokemon) => (
                    <Pokecard
                        key={pokemon.url}
                        object={{ name: pokemon.name, url: pokemon.url }} // Adjust this if necessary
                    />
                ))}
            </div>
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default PokemonList;