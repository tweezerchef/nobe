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
        setChecked(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getQuote();
    const interval = setInterval(() => {
      setChecked(false);
      getQuote();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="flex-start" minHeight="100vh">
      <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
        <Card sx={{ width: '60vh' }}>
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
