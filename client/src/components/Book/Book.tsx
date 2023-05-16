import React, { useContext, useState } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import WishListButton from '../Button/WishListButton';
import UserStarRating from '../UserStarRating/UserStarRating';
import UserContext from '../../hooks/Context';
import BigBook from './BookBig';
import LendingLibraryButton from '../Button/LendingLibraryButton';

const useStyles = makeStyles({
  card: {
    backgroundImage: 'url("https://i.imgur.com/Mjey231.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    /* Additional CSS properties */
  },
});

const BigBookOverlay = styled.div`
  position: fixed;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
`;

const Book = React.memo((props: any) => {
  const classes = useStyles();
  const [showBigBook, setShowBigBook] = useState(false);
  const { book } = props;
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const id = user?.id;
  if (!book) {
    return null;
  }
  const handleOnClick = () => {
    setShowBigBook(true);
  };
  let value = 0;
  if (book.UserBooks && book.UserBooks.length > 0) {
    book.UserBooks.forEach((entry: any) => {
      if (entry.userId === id && entry.rating !== 0) {
        value = entry.rating;
        // console.log('value', value)
      }
    });
  }
  if (showBigBook) {
    return (
      <BigBookOverlay>
        <BigBook book={book} id={id} userRating={value} onClose={() => setShowBigBook(false)} />
      </BigBookOverlay>
    );
  }

  return (

    <Card key={book.id} variant="outlined" className={classes.card} sx={{ width: 380, margin: '10px' }}>
      <CardOverflow onClick={handleOnClick}>
        <AspectRatio ratio="2">
          {book.image ? (
            <img src={book.image} loading="lazy" alt="" />
          ) : (
            <img src="https://i.imgur.com/XrUd1L2.jpg" loading="lazy" alt="" />
          )}
        </AspectRatio>

        <LendingLibraryButton book={book} />
        <WishListButton book={book} />

      </CardOverflow>
      <Typography
        level="body1"
        sx={{
          fontSize: '1.5rem !important', mt: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', '-webkit-line-clamp': 2, '-webkit-box-orient': 'vertical',
        }}
      >
        <span onClick={handleOnClick}>
          {book.title}
        </span>
      </Typography>
      <Typography
        level="body2"
        sx={{
          mt: 0.5, mb: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}
      >
        {book.author}
      </Typography>
      <Divider inset="context" />
      <CardOverflow
        variant="soft"
        sx={{
          display: 'flex',
          gap: 1.5,
          py: 1.5,
          px: 'var(--Card-padding)',
          bgcolor: '#ecd8c6',
        }}
      >
        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary', fontSize: 'md' }}>
          {book.rating}
        </Typography>
        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }} />
        <UserStarRating book={book} id={id} value={value} />
      </CardOverflow>
    </Card>

  );
});

export default Book;
