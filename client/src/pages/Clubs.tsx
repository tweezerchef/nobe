import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid, Card, CardContent, Typography,
} from '@material-ui/core';
import axios from 'axios';
import styled from 'styled-components';
import CreateClubs from '../components/CreateClubs/CreateClubs';
import { ClubHeader } from './style';

export interface Club {
  id: string;
  name: string;
  description: string;
  image: string;
}

function Clubs() {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    async function fetchClubs() {
      const response = await axios.get('/api/clubs');

      setClubs(response.data);
    }
    fetchClubs();
  }, []);

  const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

  const StyledCard = styled(Card) <{ flexBasis?: string }>`
  flex-basis: ${(props) => props.flexBasis || '33%'};
  margin: 10px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

  //   const HeaderBox = styled.div`
  //   background-color: lightblue;
  //   padding: 20px 0;
  //   margin: 20px auto;
  //   border-radius: 20px;
  //   text-align: center;
  //   max-width: 300px;
  // `;

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          {/* <HeaderBox> */}
          <ClubHeader>Create a Club</ClubHeader>
          {/* </HeaderBox> */}
          <CreateClubs setClubs={setClubs} />
        </Grid>

        <Grid item xs={12} md={8}>
          {/* <HeaderBox> */}
          <ClubHeader>Book Clubs</ClubHeader>
          {/* </HeaderBox> */}
          <CardContainer>
            {clubs && clubs.length > 0 && clubs.map((club) => (
              <StyledCard key={club.id} flexBasis="25%">
                <Link
                  to={`/clubs/${club.id}?name=${encodeURIComponent(club.name)}`}
                  style={{
                    color: 'black', textDecoration: 'none', fontSize: '24px', fontWeight: 600, display: 'block', width: '100%',
                  }}
                >
                  <iframe
                    src={club.image}
                    style={{
                      pointerEvents: 'none', display: 'block', margin: '0 auto', border: 'none', paddingTop: '8px', width: '100%',
                    }}
                  />
                  <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h5" component="h2" style={{ textAlign: 'center', marginBottom: '10px' }}>
                      {club.name}
                    </Typography>
                    <Typography variant="body1" component="p" style={{ fontSize: '18px', color: 'gray' }}>
                      {club.description}
                    </Typography>
                  </CardContent>
                </Link>
              </StyledCard>
            ))}
          </CardContainer>
        </Grid>
      </Grid>
    </div>
  );
}

export default Clubs;
