import React, { useContext } from 'react';
import UserContext from '../hooks/Context';
import Profile from './Profile';
import UsersProfile from './UserProfile';

function Home() {
  const userContext = useContext(UserContext);
  const user = userContext?.user;

  return (
    <UsersProfile />
  );
  // }
}

export default Home;
