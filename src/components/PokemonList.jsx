import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokecard from './Pokecard';

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    const [prevUrl, setPrevUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // Add a state for search query

    const fetchPokemons = async (url) => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            setPokemons(response.data.results);
            setFilteredPokemons(response.data.results); // Initially, filtered list is the full list
            setNextUrl(response.data.next);
            setPrevUrl(response.data.previous);
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch initial data
    useEffect(() => {
        fetchPokemons(nextUrl);
    }, []);

    // Update filteredPokemons whenever pokemons or searchQuery changes
    useEffect(() => {
        const filtered = pokemons.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPokemons(filtered);
    }, [searchQuery, pokemons]);

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
            <input
                className='search'
                type="text"
                placeholder="Search Pokémon"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="pagination-buttons">
                <button onClick={handlePrev} disabled={!prevUrl || loading}>Previous</button>
                <button onClick={handleNext} disabled={!nextUrl || loading}>Next</button>
            </div>
            
            <div className="cards-container">
                {filteredPokemons.map((pokemon) => (
                    <Pokecard
                        key={pokemon.url}
                        object={{ name: pokemon.name, url: pokemon.url }}
                    />
                ))}
            </div>
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default PokemonList;