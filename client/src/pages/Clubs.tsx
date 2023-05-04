import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Container, Grid, Button, Card, CardContent, CardMedia, Typography, TextField, FormControl, FormLabel,
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
`;

  const StyledCard = styled(Card) <{ flexBasis?: string }>`
  flex-basis: ${(props) => props.flexBasis || '33%'};
  margin: 10px;
`;

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <ClubHeader>Create a Club</ClubHeader>
          <CreateClubs setClubs={setClubs} />
        </Grid>

        <Grid item xs={12} md={8}>
          <ClubHeader>Book Clubs</ClubHeader>
          <CardContainer>
            {clubs.map((club) => (
              <StyledCard key={club.id} flexBasis="25%">
                <Link
                  to={`/clubs/${club.id}?name=${encodeURIComponent(club.name)}`}
                  style={{
                    color: 'black', textDecoration: 'none', fontSize: '24px', fontWeight: 600, display: 'block', width: '100%',
                  }}
                >
                  <iframe
                    src={club.image}
                    style={{ pointerEvents: 'none' }}
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
