import * as React from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const EntryPage = styled.div`
display: flex;
align-items: center; flex-direction: column;
min-height: 100vh;
background-color: #fbfbfb
`;

export const PageHeader = styled(Link)`
font-size: 2rem;
font-weight: 600; margin: 40px 0; color: inherit;
`;

export const ClubHeader = styled.h1`
text-align: center;
`;

export const BookTitle = styled.h3`
text-align: center;
`;

export const ClubDescription = styled.h2`
text-align: center;
`;

export const SpotContainer = styled.div`
display: flex;
height: 100vh;
`;

export const Controls = styled.div`
width: 20%;
padding: 1rem;
background: #14161a;
color: #fff;
`;

export const Map = styled.div`
width: 80%;
height: 100vh;
`;

export const MapContainer = styled.div`
width: 100%;
height: 100vh;
`;

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

export const StyledTextarea = styled(TextareaAutosize)(
  () => `
  width: 400px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px 12px 0 12px;

  &:hover {
    border-color: ${blue[400]};
  }
  }
  // firefox
  &:focus-visible {
    outline: 0;
  }
  padding: 10px;
`,
);
