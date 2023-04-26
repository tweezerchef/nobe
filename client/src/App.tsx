import React, { useState, useEffect } from 'react';
import Router from './Router';
import ResponsiveAppBar from './components/Navbar/ResponsiveAppBar';
import OpenIconSpeedDial from './components/ActionButton/ActionButton';
import UserContext, { UserContextType } from './hooks/Context';
import Navbar from './components/Navbar/Navbar';

function App() {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load the user data from localStorage when the app loads
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const setUserAndSave = (userData: any) => {
        // Save the user data to the state and localStorage
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const userContextValue: UserContextType = {
        user,
        setUser: setUserAndSave,
    };

    return (
        <div className="App">
            <UserContext.Provider value={userContextValue}>
                <ResponsiveAppBar />
                {isLoading ? <div>Loading...</div> : <Router />}
            </UserContext.Provider>
            <OpenIconSpeedDial />
        </div>
    );
}

export default App;