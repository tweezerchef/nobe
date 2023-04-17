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

function Router() {
    return (
        <Routes>
            <Route path="/" Component={Home} />
            <Route path="/login" Component={Login} />
            <Route path="/signup" Component={Signup} />
        </Routes>
    );
}
export default Router