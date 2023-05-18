import React, { useContext } from 'react';
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

interface BigBookOverlayProps {
  bigBookPosition: {
    left: number;
    top: number;
  };
}

const useStyles = makeStyles({
  card: {
    backgroundImage: 'url("https://i.imgur.com/Mjey231.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    /* Additional CSS properties */
  },
});

const Book = React.memo((props: any) => {
  const classes = useStyles();
  const { book } = props;
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const id = user?.id;

  const BigBookOverlay = styled.div<BigBookOverlayProps>`
      position: static;
      z-index: 10;  left: ${(props) => props.bigBookPosition.left}px;
      top: ${(props) => props.bigBookPosition.top}px;// Use the top property
      border-radius: 20px;
      box-shadow: 3px 3px 1px rgba(0, 0, 0, 0.15);
`;
  if (!book) {
    return null;
  }
  // const handleOnClick = () => {
  //   setShowBigBook(true);
  // };
  const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    props.onClick(e, book);
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
  if (props.showBigBook) {
    return (
      <BigBookOverlay bigBookPosition={props.bigBookPosition}>
        <BigBook book={book} id={id} userRating={value} onClose={() => props.onClose()} />
      </BigBookOverlay>
    );
  }

  return (

    <Card
      key={book.id}
      variant="outlined"
      className={classes.card}
      sx={{
        width: '25vh', height: '90%', margin: '10px', boxShadow: '0px 0px 25px  rgba(37, 37, 37, 0.6)',
      }}
    >
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
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }} />
        <UserStarRating book={book} id={id} value={value} />
      </CardOverflow>
    </Card>

  );
});

export default Book;
