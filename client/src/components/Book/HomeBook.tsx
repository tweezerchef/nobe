import React, { useContext } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Box from '@mui/joy/Box';
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
import NearMeButton from '../Button/NearMeButton';
import { Book } from '../../typings/types';

interface BigBookOverlayProps {
  bigBookPosition: {
    left: number;
    top: number;
  };
}
interface HomeBookProps {
  book: Book;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, book: Book) => void;
  showBigBook: boolean;
  bigBookPosition: {
    left: number;
    top: number;
  };
  onClose: () => void;
  nearMeBooks: string[];

}

const useStyles = makeStyles({
  card: {
    backgroundImage: 'url("https://i.imgur.com/Mjey231.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
});

const Book = React.memo((props: any) => {
  const classes = useStyles();
  const { book, nearMeBooks } = props;
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const id = user?.id;

  const BigBookOverlay = styled.div<BigBookOverlayProps>`
      position: static;
      z-index: 10;  left: ${(props) => props.bigBookPosition.left}px;
      top: ${(props) => props.bigBookPosition.top}px;
      border-radius: 20px;
      box-shadow: 3px 3px 1px rgba(0, 0, 0, 0.15);
`;
  if (!book) {
    return null;
  }
  const maxCharacters = 50;
  const ellipsisCharacters = 10; // Number of characters to show before the ellipsis

  let displayedTitle = book.title;
  if (book.title.length > maxCharacters) {
    displayedTitle = `${book.title.substring(0, maxCharacters - ellipsisCharacters)}...`;
  }

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    props.onClick(e, book);
  };
  let value = 0;
  if (book.UserBooks && book.UserBooks.length > 0) {
    book.UserBooks.forEach((entry: any) => {
      if (entry.userId === id && entry.rating !== 0) {
        value = entry.rating;
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
        width: '17vw',
        height: '27vh',
        minHeight: '170px',
        margin: '.2vh',
        boxShadow: '0px 0px 25px  rgba(37, 37, 37, 0.6)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        style={{
          position: 'relative',
          width: '100%',
          height: '55%', // Adjust as per your requirement
          overflow: 'hidden',
          margin: '0',
          padding: '0',
        }}
        onClick={handleOnClick}
      >
        <img
          src={book.image ? book.image : 'https://i.imgur.com/XrUd1L2.jpg'}
          loading="lazy"
          alt=""
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
          }}
        />
      </Box>
      <CardOverflow>
        <NearMeButton book={book} nearMeBooks={nearMeBooks} />
        <LendingLibraryButton book={book} />
        <WishListButton book={book} />
      </CardOverflow>
      <Typography
        level="body1"
        onClick={handleOnClick}
        sx={{
          mt: 2.4,
          overflow: 'hidden',
          whiteSpace: 'normal',
          flexWrap: 'wrap',
          textAlign: 'center',
        }}
      >
        {displayedTitle}
      </Typography>

      <Typography
        level="body2"
        sx={{
          mt: 'auto',
          mb: 'auto',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textAlign: 'center',
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
