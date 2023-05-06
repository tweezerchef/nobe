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
