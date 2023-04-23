import React, { useState, useEffect } from 'react';
import Router from './Router';
// import ResponsiveAppBar from './components/Navbar/ResponsiveAppBar';
import UserContext from './hooks/Context';


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
                <Router />
            </UserContext.Provider>
        </div>
    );
}

export default App;