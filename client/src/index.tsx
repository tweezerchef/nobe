/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
// import { pink } from '@mui/material/colors';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import AppWrapper from './AppWrapper';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  // <BrowserRouter>
  //   <MaterialCssVarsProvider theme={{ [THEME_ID]: materialTheme }}>
  //     <JoyCssVarsProvider>
  <StyledEngineProvider injectFirst>
    <AppWrapper />
  </StyledEngineProvider>,
  //     </JoyCssVarsProvider>
  //   </MaterialCssVarsProvider>
  // </BrowserRouter>
);
