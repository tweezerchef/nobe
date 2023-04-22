import React from 'react';
import Router from './Router';
import ResponsiveAppBar from './components/Navbar/ResponsiveAppBar';

function App() {
    return (
        <div className="App">
            <ResponsiveAppBar />
            <Router />
        </div>
    )
}
export default App;