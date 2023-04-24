
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import GifSearch from './GifSearch';
import axios from 'axios';
import { Button } from '@mui/material';

// interface CreateClubsProps {
//   setClubs: React.Dispatch<React.SetStateAction<typeof Clubs[]>>;
// }

const createClubs = (props: any) => {
  const [clubName, setClubName] = useState('');
  const [clubDescription, setClubDescription] = useState('');
  const [clubImage, setClubImage] = useState('');
  const { setClubs } = props;

  const handleSubmit = () => {
    let body = {
      name: clubName,
      description: clubDescription,
      image: clubImage
    }
    try {
      axios.post('/api/create-club', body)
        .then(data => {
          setClubs(data.data);
        })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box
      component="form"
      sx={{
        maxWidth: '600px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > :not(style)': { m: 1, width: '25ch' },
        justifyContent: 'center',
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="club-name"
        label="Club Name"
        variant="outlined"
        value={clubName}
        onChange={(e) => setClubName(e.target.value)}
      />
      <TextField
        id="club-description"
        label="Club Description"
        variant="outlined"
        value={clubDescription}
        onChange={(e) => setClubDescription(e.target.value)}
      />
      <GifSearch setClubImage={setClubImage} />
      <Button variant="contained" color="primary" onClick={() => handleSubmit()}>
        Create a new club
      </Button>
    </Box>
  );

}


export default createClubs;