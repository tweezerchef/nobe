import React from 'react';
import {
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
import Trending from './pages/Trending';

function Router() {
    return (
        <Routes>
            <Route path="/" Component={Home} />
            <Route path="/login" Component={Login} />
            <Route path="/signup" Component={Signup} />
            <Route path="/clubs" Component={Clubs} />
            <Route path="/locations" Component={Locations} />
            <Route path="/trending" Component={Trending} />
        </Routes>
    );
}
export default Router