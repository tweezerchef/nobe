import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stack from '@mui/joy/Stack';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { IconButton } from '@mui/material';
import Slide from '@mui/material/Slide';
import { padding } from '@mui/system';
import UserContext from '../../hooks/Context';

function HomeNearMe() {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const id = user?.id;
  const lat = user?.latitude || 29.9584;
  const lon = user?.longitude || -90.0651;
  const radius = user?.radius || 10;

  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left' | undefined>('left');
  const [books, setBooks] = useState([]);

  const getBooks = () => {
    axios.get('/location/locations/home', {
      params: {
        lat,
        lon,
        radius,
        id,
      },
    })
      .then((response) => {
        console.log(response.data);
        setBooks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getBooks();
  }, []);
  return (
    <div>
      <h1>HomeNearMe</h1>
    </div>
  );
}
export default HomeNearMe;
