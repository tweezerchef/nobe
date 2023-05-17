import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import IconButton from '@mui/joy/IconButton';
import { Tooltip } from '@material-ui/core';
import { fontSize } from '@mui/system';
import UserContext from '../../hooks/Context';

function UserStarRating(props: any) {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const setUser = userContext?.setUser;
  const { book, id } = props;

  // eslint-disable-next-line react/destructuring-assignment
  const rating = props.value;

  const [value, setValue] = React.useState<number | null>(rating);

  const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    axios.post('/review', { rating: newValue, book, id })
      .catch((error) => {
        console.error('Failed to update rating:', error);
      });

    setValue(newValue);
  };

  return (
    <Tooltip title="your rating" placement="top-end">

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center the content horizontally
          justifyContent: 'center', // Center the content vertically
          size: 'lg',
        }}
      >
        <Rating
          name="simple-controlled"
          value={value}
          onChange={handleRatingChange}
        />

      </Box>
    </Tooltip>

  );
}

export default UserStarRating;
