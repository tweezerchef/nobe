import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';

function QuoteDisplay() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [checked, setChecked] = useState(false);

  const getQuote = () => {
    axios
      .get('https://api.quotable.io/random')
      .then((res) => {
        setQuote(res.data.content);
        setAuthor(res.data.author);
        setChecked(false); // Set checked to false to trigger the slide-out animation
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
    }, 10000); // Adjust the interval time according to your desired interval
    return () => clearInterval(interval);
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="flex-start" minHeight="100vh">
      <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
        <Card variant="outlined" sx={{ width: '60vh', height: '10vh', margin: '10px' }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Quotes As The Algorithm Works Its Magic
            </Typography>
            <Typography variant="h5" component="div" />
            Author:
            {' '}
            {author}
            <Typography variant="body1">
              <br />
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
