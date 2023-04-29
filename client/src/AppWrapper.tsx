
// AppWrapper.tsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Experimental_CssVarsProvider as MaterialCssVarsProvider, THEME_ID } from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import App from './App';
import {
    useColorScheme as useMaterialColorScheme,
} from '@mui/material/styles';
import { useColorScheme as useJoyColorScheme } from '@mui/joy/styles';
import { experimental_extendTheme as materialExtendTheme } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';

const materialTheme = materialExtendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: pink[600],
                },
                background: {
                    default: '#f5f5f5', // The background color for light mode
                },
            },
        },
        dark: {
            palette: {
                primary: {
                    main: pink[400],
                },
                background: {
                    default: '#303030', // The background color for dark mode
                },
            },
        },
    },
});

function AppWrapper() {
    return (
        <BrowserRouter>
            <MaterialCssVarsProvider theme={{ [THEME_ID]: materialTheme }}>
                <JoyCssVarsProvider>
                    <CssBaseline enableColorScheme />
                    <AppWithColorSchemeHooks />
                </JoyCssVarsProvider>
            </MaterialCssVarsProvider>
        </BrowserRouter>
    );
}

function AppWithColorSchemeHooks() {
    const { mode, setMode } = useMaterialColorScheme();
    const { setMode: setJoyMode } = useJoyColorScheme();

    const handleSetMaterialMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    };

    const handleSetJoyMode = () => {
        setJoyMode(mode === 'light' ? 'dark' : 'light');
    };

    return (
        <App
            setMaterialMode={handleSetMaterialMode}
            setJoyMode={handleSetJoyMode}
        />
    );
}

export default AppWrapper;
