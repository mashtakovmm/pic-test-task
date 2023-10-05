import React from 'react';
import Header from '../widgets/Header';
import PostsList from '../widgets/PostsList';
import './Home.css'

function Home() {

    return (
    <>
        <Header />
        <div className='home-container'> 
            <PostsList />
        </div>
    </>


    );
}

export default Home;