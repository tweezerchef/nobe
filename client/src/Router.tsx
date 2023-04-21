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
import ClubDiscussion from './pages/ClubDiscussion';
import CreateClub from './pages/CreateClub';
import Locations from './pages/Nearme';
import Profile from './pages/Profile';
import Landing from './pages/Landing';
import Trending from './pages/Trending';
import UserRecoInputPage from './pages/UserRecoInput';

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
            <Route path="/home" element={<Home />} />
            <Route
                path="/signup"
                element={user?.email ? <Navigate to="/home" /> : <Signup />}
            />
            <Route
                path="/login"
                element={user?.email ? <Navigate to="/home" /> : <Login onLogin={function (): void {
                    throw new Error('Function not implemented.');
                }} />}
            />
            <Route path="/clubs" element={< Clubs />} />
            <Route path="/clubs/:id" element={<ClubDiscussion />} />
            <Route path="/create-club" element={<CreateClub />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/user-reco-input" element={<UserRecoInputPage />} />

        </Routes>
    );
}
export default Router