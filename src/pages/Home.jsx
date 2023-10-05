import React from 'react';
import Header from '../widgets/Header';
import PostsList from '../widgets/PostsList';
import './Home.css'

function Home() {

    return (
        <div className='home-container'> 
            <Header />
            <PostsList />
        </div>

    );
}

export default Home;