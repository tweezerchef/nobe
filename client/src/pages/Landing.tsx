import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar'
import { Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './Home';




function Landing() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogin = () => {
        setIsLoggedIn(true);
    };
    // (function () {
    //     localStorage.clear();
    // })();
    return (
        <>
            <h1>Welcome to the Landing page!</h1>
            {isLoggedIn ? (
                <Navigate to="/home" />
            ) : (
                <Login />
            )}
        </>
    );
}
export default Landing;
