/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
// import { pink } from '@mui/material/colors';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { StyleSheetManager } from 'styled-components';
import AppWrapper from './AppWrapper';

interface NoWarnStyleSheetManagerProps {
  children: React.ReactNode;
}

function NoWarnStyleSheetManager({ children }: NoWarnStyleSheetManagerProps) {
  return (
    <StyleSheetManager disableVendorPrefixes>
      {children}
    </StyleSheetManager>
  );
}
console.error = ((originalError) => (error) => {
  // Check if the error message contains the component ID pattern
  const componentIdPattern = /The component .*? with the id of ".*?" has been created dynamically\./;
  if (error instanceof Error && componentIdPattern.test(error.message)) {
    return; // Ignore the error, do not log it
  }

  // Log the error if it doesn't match the excluded pattern
  originalError.call(console, error);
})(console.error);

// Override console.error to suppress the specific warning

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  // <BrowserRouter>
  //   <MaterialCssVarsProvider theme={{ [THEME_ID]: materialTheme }}>
  //     <JoyCssVarsProvider>
  <NoWarnStyleSheetManager>
    <StyledEngineProvider injectFirst>
      <AppWrapper />
    </StyledEngineProvider>
  </NoWarnStyleSheetManager>,
  //     </JoyCssVarsProvider>
  //   </MaterialCssVarsProvider>
  // </BrowserRouter>
);
