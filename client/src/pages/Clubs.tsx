import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClubHeader } from './style'
import { Button, Card, CardContent, Typography, TextField, FormControl, FormLabel } from "@material-ui/core";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import axios from "axios";
import CreateClubs from "../components/CreateClubs/CreateClubs";


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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewClubName(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if the new club name already exists in the database
    const existingClubs = await axios.get('/api/clubs');
    const clubExists = existingClubs.data.some((club: { name: string; }) => club.name === newClubName);

    if (clubExists) {
      alert('Club name already exists!');
      return;
    }

    try {
      const response = await axios.post('/api/create-club', { name: newClubName });

      setClubs([...clubs, response.data]); // add the new club to the state variable

      setShowForm(false); // hide the form after submission
      setNewClubName(''); // reset the input box
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ClubHeader>Book Clubs</ClubHeader>
      <React.Fragment>
        {/* <Container maxWidth="md"> */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} >
            <CreateClubs setClubs={setClubs} />
          </Grid>
          {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={() => setShowForm(!showForm)}>
              Create a new club
            </Button>
          </div> */}
          {/* {showForm && (
            <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
              <FormControl>
                <FormLabel htmlFor="name"></FormLabel>
                <TextField
                  label="Club Name"
                  variant="outlined"
                  value={newClubName}
                  onChange={handleInputChange}
                />
                <Button type="submit" variant="contained">
                  Create Club
                </Button>
              </FormControl>
            </form>
          )} */}
          <Grid item xs={12} md={8}>
            <div>
              {clubs.map((club) => (
                <Card key={club.id} >
                  <CardContent>
                    <Typography variant="h5" component="h2" style={{ textAlign: 'center' }}>
                      <Link
                        to={`/clubs/${club.id}?name=${encodeURIComponent(
                          club.name
                        )}`}
                      >
                        {club.name}
                      </Link>
                    </Typography>
                    <Typography variant="body1" component="p">
                      {club.description}
                    </Typography>
                    <iframe src={club.image}
                      style={{ pointerEvents: 'none' }} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </Grid>
        </Grid>
        {/* </Container> */}
      </React.Fragment>
    </div>
  )
}

export default Clubs;
