// AppWrapper.tsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  Experimental_CssVarsProvider as MaterialCssVarsProvider, THEME_ID,
  useColorScheme as useMaterialColorScheme,
  experimental_extendTheme as materialExtendTheme,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider, useColorScheme as useJoyColorScheme } from '@mui/joy/styles';
import { blue } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { GlobalStyle } from './reset.css';

const materialTheme = materialExtendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#3f51b5',
        },
        secondary: {
          main: '#f50057',
        },
        background: {
          default: '#efefef',
          paper: '#d6d6d6',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: blue[800],
        },
        background: {
          default: '#0f228d', // The background color for dark mode
        },
      },
    },
  },
});

function AppWrapper() {
  return (
    <BrowserRouter>
      <GlobalStyle />
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
