import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

function Home() {
    const exists = localStorage.getItem('user')
    if (!exists) {
        return (
            <div>
                <Navbar children={undefined} />
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
