import React, { useState, useEffect } from 'react';
import {
    Navigate,
    BrowserRouter,
    Routes,
    Route,
    Link,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Clubs from './pages/Clubs';
import Locations from './pages/Nearme';
import Profile from './pages/Profile';
import Landing from './pages/Landing';

interface User {
    email: string;
}


function Router() {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const theUser = localStorage.getItem("user");

        if (theUser && !theUser.includes("undefined")) {
            setUser(JSON.parse(theUser));
        }
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route
                path="/signup"
                element={user?.email ? <Navigate to="/home" /> : <Signup />}
            />
            <Route
                path="/login"
                element={user?.email ? <Navigate to="/home" /> : <Login />}
            />
            <Route path="/clubs" element={< Clubs />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
}
export default Router