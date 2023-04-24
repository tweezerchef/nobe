import React, { useState, useEffect } from 'react';
import Router from './Router';
import ResponsiveAppBar from './components/Navbar/ResponsiveAppBar';
import UserContext from './hooks/Context';
import Navbar from './components/Navbar/Navbar';


function App() {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const userString = localStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : null;
        if (user && user.id) {
            setUserId(user.id);
        }
    }, []);

    return (
        <div className="App">
            <UserContext.Provider value={userId}>
                <ResponsiveAppBar />
                <Router />
            </UserContext.Provider>
        </div>
    );
}

export default App;