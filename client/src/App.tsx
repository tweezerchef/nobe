// export { }
import react, { useState, useEffect } from 'react';
import Router from './Router';
import ResponsiveAppBar from './components/Navbar/ResponsiveAppBar';
import OpenIconSpeedDial from './components/ActionButton/ActionButton';
import UserContext, { UserContextType } from './hooks/Context';
import ChatContext, { ChatContextType } from './hooks/ChatContext';
import axios from 'axios';
import {
    experimental_extendTheme as materialExtendTheme,
    Experimental_CssVarsProvider as MaterialCssVarsProvider, useTheme as useMaterialTheme,
    THEME_ID
} from '@mui/material/styles';

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

    //const { setMode: setJoyMode } = useJoyColorScheme();
    // const [mounted, setMounted] = React.useState(false);



    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    const user = JSON.parse(storedUser);
                    const { id } = user;
                    const response = await axios.get(`/user/id?id=${id}`);
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
    };

    const userContextValue: UserContextType = {
        user,
        setUser: setUserAndSave,
    };

    const chatContextValue: ChatContextType = {
        messages,
        setMessages,
    };

    return (

        <div className="App">
            <UserContext.Provider value={userContextValue}>
                <ChatContext.Provider value={chatContextValue}>
                    <ResponsiveAppBar setMode={setMaterialMode} setJoyMode={setJoyMode} />
                    {isLoading ? <div>Loading...</div> : <Router />}
                    <OpenIconSpeedDial/>
                </ChatContext.Provider>
            </UserContext.Provider>
        </div>

    );
}

export default App;