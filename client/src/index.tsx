import React from 'react';
// import { pink } from '@mui/material/colors';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";;
import AppWrapper from './AppWrapper';
import { StyledEngineProvider } from '@mui/material/styles';
// import {
//   Experimental_CssVarsProvider as MaterialCssVarsProvider,
//   THEME_ID,
// } from '@mui/material/styles';
// import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
// import { experimental_extendTheme as materialExtendTheme } from '@mui/material/styles';
// const materialTheme = materialExtendTheme({
//   colorSchemes: {
//     light: {
//       palette: {
//         primary: {
//           main: pink[600],
//         },
//       },
//     },
//     dark: {
//       palette: {
//         primary: {
//           main: pink[400],
//         },
//       },
//     },
//   },
// });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <BrowserRouter>
  //   <MaterialCssVarsProvider theme={{ [THEME_ID]: materialTheme }}>
  //     <JoyCssVarsProvider>
  <StyledEngineProvider injectFirst>
    <AppWrapper />
  </StyledEngineProvider>
  //     </JoyCssVarsProvider>
  //   </MaterialCssVarsProvider>
  // </BrowserRouter>
);