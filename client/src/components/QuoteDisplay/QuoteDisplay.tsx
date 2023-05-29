import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function QuoteDisplay() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [checked, setChecked] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getQuote = () => {
    axios
      .get('https://api.quotable.io/random')
      .then((res) => {
        setQuote(res.data.content);
        setAuthor(res.data.author);
        setChecked(false);
        setTimeout(() => {
          setChecked(true); // Set checked to true after a delay to trigger the slide-in animation
        }, 2000); // Adjust the delay according to your desired transition time
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getQuote();
    const interval = setInterval(() => {
      getQuote();
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="flex-start" minHeight="100vh">
      <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
        <Card
          variant="outlined"
          sx={{
            width: isMobile ? '70vw' : '40vw',
            height: isMobile ? '62vw' : '18vw',
            minHeight: isMobile ? '62vw' : '250px',
            maxHeight: isMobile ? '62vw' : '300px',
            maxWidth: isMobile ? '70vw' : '500px',
            boxShadow: '0px 0px 25px  rgba(37, 37, 37, 0.6)',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            justifyItems: 'center',
            borderRadius: '10px',
          }}
        >
          <CardContent>
            <Typography variant="h5" mt=".5rem">
              Quotes As The Algorithm Works Its Magic To Find You A Book
            </Typography>
            <Typography variant="h6" mt="1rem" />
            Author:
            {' '}
            {author}
            <Typography variant="h6" mt="1rem">
              "
              {quote}
              "
            </Typography>
          </CardContent>
        </Card>
      </Slide>
    </Box>
  );
}

export default QuoteDisplay;
