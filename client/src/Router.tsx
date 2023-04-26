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
import DiscussionPosts from './pages/DiscussionPosts';
import Locations from './pages/Nearme';
import Profile from './pages/Profile';
import Landing from './pages/Landing';
import Trending from './pages/Trending';
import UserRecoInputPage from './pages/UserRecoInput';
import Recommended from './pages/Recommended';
import ReadingSpots from './pages/ReadingSpots';

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
                element={user?.email ? <Navigate to="/home" /> : <Login />}
            />
            <Route path="/clubs" element={< Clubs />} />
            <Route path="/clubs/:id" element={<ClubDiscussion />} />
            <Route path="/clubs/:id/discussion/:id" element={<DiscussionPosts />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/profile/:id?" element={<Profile />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/user-reco-input" element={<UserRecoInputPage />} />
            <Route path="/recommended" element={<Recommended />} />
            <Route path="/reading-spots" element={<ReadingSpots />} />

        </Routes>
    );
}
export default Router