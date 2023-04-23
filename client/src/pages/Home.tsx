import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { UserContext } from '../hooks/Context';

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
                <Navbar children={undefined} />
                <Link to="/user-reco-input">
                    <button>Start Building Your Recommendations</button>
                </Link>
                <Link to="/recommended">
                    <button>Recommendations</button>
                </Link>
                <h1>Home</h1>

            </>
        );
    }
}

export default Home;
