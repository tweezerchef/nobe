// export { }
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider, useTheme as useMaterialTheme,
  THEME_ID,
} from '@mui/material/styles';
import styled from '@mui/system/styled';
import Router from './Router';
import ResponsiveAppBar from './components/Navbar/ResponsiveAppBar';
import UserContext, { UserContextType } from './hooks/Context';
import ChatContext, { ChatContextType } from './hooks/ChatContext';

interface AppProps {
  setMaterialMode: () => void;
  setJoyMode: () => void;
}
const Container = styled('div')(({ theme }) => ({
  maxWidth: '2000px', // or whatever max-width you want
  margin: '0 auto', // centers your content
  width: '100%',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0, 2), // Add some horizontal padding on smaller screens
  },
}));

const materialTheme = materialExtendTheme();
function App({ setMaterialMode, setJoyMode }: AppProps) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [chatState, setChatState] = useState<boolean>(false);
  const [chatUser, setChatUser] = useState<any>(null);

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

  const setUserAndSave = async (userData: any) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoaded(true);
    setIsLoading(false);
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

    <Container>
      <UserContext.Provider value={userContextValue}>
        <ChatContext.Provider value={chatContextValue}>
          <ResponsiveAppBar setMode={setMaterialMode} setJoyMode={setJoyMode} />
          {isLoading ? null : <Router />}
        </ChatContext.Provider>
      </UserContext.Provider>
    </Container>

  );
}

export default App;
