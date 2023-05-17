import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Login from './Login';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Home from './Home';

function Landing() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
    // (function () {
    //     localStorage.clear();
    // })();
  return (
    <div>
      {isLoggedIn ? (
        <Navigate to="/home" />
      ) : (
        <Login />
      )}
    </div>
  );
}
export default Landing;
