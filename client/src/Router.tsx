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
            <Route path="/" Component={Home} />
            <Route path="/login" Component={Login} />
            <Route path="/signup" Component={Signup} />
            <Route path="/clubs" Component={Clubs} />
            <Route path="/locations" Component={Locations} />
        </Routes>
    );
}
export default Router