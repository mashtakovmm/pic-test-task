import React from 'react';
import GitHubLink from '../shared/GitHubLink';
import Logo from '../shared/Logo'
import './Header.css'


function Header() {

    return(
        <div className='header-container'>
            <Logo />
            <GitHubLink />
        </div>
    );
}

export default Header;