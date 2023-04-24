import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { UserContext } from '../hooks/Context';
import Profile from './Profile';

function Home() {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const id = user ? user.id : '';
    const exists = localStorage.getItem('user')
    if (!exists) {
        return (
            <div>
                <h1>Please Login</h1>

            </div>
        )
    }
    else {

        return (
            <>

                <h1>Home</h1>
                <Profile />

            </>
        );
    }
}

export default Home;
