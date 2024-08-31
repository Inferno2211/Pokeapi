import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pokecard = ({ object }) => {
    const [pokemonData, setPokemonData] = useState(null);
    const [typeIcons, setTypeIcons] = useState([]);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const response = await axios.get(object.url);
                setPokemonData(response.data);
                
                // Fetch type icons
                const icons = await Promise.all(
                    response.data.types.map(async (type) => {
                        try {
                            const typeResponse = await axios.get(type.type.url);
                            const iconUrl = typeResponse.data.sprites["generation-viii"]["legends-arceus"].name_icon;
                            return iconUrl;
                        } catch (error) {
                            console.error(`Error fetching type icon for ${type.type.name}:`, error);
                            return null;
                        }
                    })
                );

                setTypeIcons(icons.filter(url => url));
            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            }
        };

        fetchPokemonData();
    }, [object.url]);

    if (!pokemonData) return null;

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <div className="card">
            <h2>{capitalize(pokemonData.name)}</h2>
            <img src={pokemonData.sprites.other["official-artwork"].front_default} alt={`${pokemonData.name} artwork`} />
            <div className='stats'>
                {pokemonData.stats.map((stat, index) =>(
                    <div>{capitalize(stat.stat.name)}: {stat.base_stat}</div>
                ))}
            </div>
            <div className="type-icons">
                {typeIcons.map((iconUrl, index) => (
                    <img key={index} src={iconUrl} alt={`Type icon ${index}`} />
                ))}
            </div>
        </div>
    );
};

export default Pokecard;