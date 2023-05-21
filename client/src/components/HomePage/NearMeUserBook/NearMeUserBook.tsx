/* eslint-disable react/function-component-definition */
import React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { UserBook, Book } from '../../../typings/types';

interface NearMeUserBookProps {
  userBook: UserBook,
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Books = Book;

const NearMeUserBook: React.FC<NearMeUserBookProps> = ({ userBook }) => {
  const { User, Books } = userBook;
  const bookcover = Books.image || 'https://i.imgur.com/XrUd1L2.jpg';

  return (

    <Card
      variant="outlined"
      sx={{
        width: '28vw',
        height: '100%',
        margin: '10px',
        boxShadow: '0px 0px 25px  rgba(37, 37, 37, 0.6)',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#ececec',
      }}
    >
      <Grid container spacing={0} alignItems="center" justifyContent="space-evenly">
        <Grid item xs={4} textAlign="center">
          <Link to={`/profile/${User?.id}`}>
            <Avatar
              src={User?.picture}
              alt={User?.firstName}
              style={{
                width: '4rem',
                height: '4rem',
                margin: '0 auto',
              }}
            />
            <Typography level="h5">
              {User?.firstName}
            </Typography>
          </Link>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={4}>
          <AspectRatio ratio="2">
            <img src={bookcover} alt="Book Cover" />
          </AspectRatio>
          <Typography level="h5" sx={{ textAlign: 'center' }}>
            {Books.title}
          </Typography>
        </Grid>
      </Grid>
    </Card>

  );
};

export default NearMeUserBook;
