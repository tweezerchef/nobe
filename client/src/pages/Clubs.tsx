import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClubHeader } from './style'
import { Box, Container, Grid, Button, Card, CardContent, CardMedia, Typography, TextField, FormControl, FormLabel } from "@material-ui/core";
import axios from "axios";
import CreateClubs from "../components/CreateClubs/CreateClubs";
import styled from 'styled-components';

export interface Club {
  id: string;
  name: string;
  description: string;
  image: string;
}

function Clubs() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newClubName, setNewClubName] = useState('');

  useEffect(() => {
    async function fetchClubs() {
      const response = await axios.get("/api/clubs");

      setClubs(response.data);
    }
    fetchClubs();
  }, []);

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = event.target;
  //   setNewClubName(value);
  // };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   // Check if the new club name already exists in the database
  //   const existingClubs = await axios.get('/api/clubs');
  //   const clubExists = existingClubs.data.some((club: { name: string; }) => club.name === newClubName);

  //   if (clubExists) {
  //     alert('Club name already exists!');
  //     return;
  //   }

  //   try {
  //     const response = await axios.post('/api/create-club', { name: newClubName });

  //     setClubs([...clubs, response.data]); // add the new club to the state variable

  //     setShowForm(false); // hide the form after submission
  //     setNewClubName(''); // reset the input box
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

  const StyledCard = styled(Card) <{ flexBasis?: string }>`
  flex-basis: ${(props) => props.flexBasis || '33%'};
  margin: 10px;
`;

  return (
    // <div style={{ display: 'flex', justifyContent: 'center' }}>
    //   <React.Fragment>
    //     {/* <Container maxWidth="md"> */}
    //     <Grid container spacing={2}>
    //       <Grid item xs={12} md={4} >
    //         <CreateClubs setClubs={setClubs} />
    //       </Grid>
    //       <Grid item xs={12} md={8}>
    //         <ClubHeader style={{ maxWidth: "800px", margin: "20px 0" }}>Book Clubs</ClubHeader>
    //         <div style={{ maxWidth: "800px", margin: "20px 0" }}>
    //           {clubs.map((club) => (
    //             <Card key={club.id} style={{ marginBottom: '20px' }}>
    //               <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    //                 <Typography variant="h5" component="h2" style={{ textAlign: 'center' }}>
    // <Link
    //   to={`/clubs/${club.id}?name=${encodeURIComponent(club.name)}`}
    //   style={{ color: 'black', textDecoration: 'none' }}
    // >
    //                     {club.name}
    //                   </Link>
    //                 </Typography>
    //                 <iframe src={club.image}
    //                   style={{ pointerEvents: 'none' }} />
    //                 <Typography variant="body1" component="p">
    //                   {club.description}
    //                 </Typography>
    //               </CardContent>
    //             </Card>
    //           ))}
    //         </div>
    //       </Grid>
    //     </Grid>
    //   </React.Fragment>
    // </div>


    //SECOND REFACTOR - TOMS
    <div>
      <React.Fragment>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} >
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
                    style={{ color: 'black', textDecoration: 'none', fontSize: '24px', fontWeight: 600, display: 'block', width: '100%' }}
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
      </React.Fragment>
    </div>
  )
}

export default Clubs;
