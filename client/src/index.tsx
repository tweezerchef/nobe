import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import { GlobalStyle } from './reset.css';
import AppWrapper from './AppWrapper';
import {
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import { experimental_extendTheme as materialExtendTheme } from '@mui/material/styles';
const materialTheme = materialExtendTheme();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <MaterialCssVarsProvider theme={{ [THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <GlobalStyle />
        <AppWrapper />
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  </BrowserRouter>
);