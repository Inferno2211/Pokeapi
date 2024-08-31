import React from 'react'
import Navbar from '../components/Navbar'
import PokemonList from '../components/PokemonList'

const Home = () => {
    return (
        <div className='main'>
            <div className='bg-img'></div>
            <Navbar />
            <PokemonList />
        </div>
    )
}

export default Home