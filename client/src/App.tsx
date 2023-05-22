// export { }
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider, useTheme as useMaterialTheme,
  THEME_ID,
} from '@mui/material/styles';
import { get } from 'http';
import Router from './Router';
import ResponsiveAppBar from './components/Navbar/ResponsiveAppBar';
import UserContext, { UserContextType } from './hooks/Context';
import ChatContext, { ChatContextType } from './hooks/ChatContext';
import { NearMeBookIdType, NearMeBookContext } from './hooks/NearMeBookContext';

interface AppProps {
  setMaterialMode: () => void;
  setJoyMode: () => void;
}

const materialTheme = materialExtendTheme();
function App({ setMaterialMode, setJoyMode }: AppProps) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [chatState, setChatState] = useState<boolean>(false);
  const [chatUser, setChatUser] = useState<any>(null);
  const [nearMeBooks, setNearMeBooks] = useState<any[]>([]);

  const getNearMeBooks = async () => {
    // Get user's latitude, longitude, and radius from the user object
    const { latitude, longitude, radius } = user;

    // Make the request to fetch nearMeBooks with query parameters
    const response = await axios.get('/location/locations/login', {
      params: {
        lat: latitude,
        lon: longitude,
        radius,
      },
    });
    console.log('response.data:', response.data);
    setNearMeBooks(response.data);
  };
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const nearMeBookContextValue: NearMeBookIdType = {
    ids: [], // If you have ids, update this
    setIds: () => {}, // If you have a function to update ids, update this
    nearMeBooks,
    setNearMeBooks,
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          const { email } = user;
          const response = await axios.get(`/user?email=${email}`);
          setUserAndSave(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const setUserAndSave = (userData: any) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoaded(true);
    setIsLoading(false);
    getNearMeBooks();
  };

  const userContextValue: UserContextType = {
    user,
    setUser: setUserAndSave,
  };

  const chatContextValue: ChatContextType = useMemo(() => ({
    chatState,
    setChatState,
    chatUser,
    setChatUser,
  }), [chatState, setChatState]);

  return (

    <div className="App">
      <NearMeBookContext.Provider value={nearMeBookContextValue}>
        <UserContext.Provider value={userContextValue}>
          <ChatContext.Provider value={chatContextValue}>
            <ResponsiveAppBar setMode={setMaterialMode} setJoyMode={setJoyMode} />
            {isLoading ? null : <Router />}
          </ChatContext.Provider>
        </UserContext.Provider>
      </NearMeBookContext.Provider>
    </div>

  );
}

export default App;
