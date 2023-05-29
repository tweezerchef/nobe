import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/joy/Card';
import Box from '@mui/joy/Box';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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
const BigBookOverlay = styled.div<BigBookOverlayProps>`
position: static;
z-index: 10;  left: ${(props) => props.bigBookPosition.left}px;
top: ${(props) => props.bigBookPosition.top}px;
border-radius: 20px;
box-shadow: 3px 3px 1px rgba(0, 0, 0, 0.15);
`;

const useStyles = makeStyles({
  card: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    transition: 'background-image 0.06s ease-in-out',
  },
});

const Book = React.memo(({
  nearMeBooks, book, onClose, onClick, showBigBook, bigBookPosition,
}: HomeBookProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const id = user?.id;
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>('');
  const [bottomColor, setBottomColor] = useState<string>('');
  const storedMode = localStorage.getItem('mode');
  const [isWishListed, setIsWishListed] = useState<boolean>(false);
  const [isLendinglibrary, setIsLendingLibrary] = useState<boolean>(false);

  if (!book) {
    return null;
  }

  const [userRating, setUserRating] = React.useState<number>(0);
  const maxCharacters = 45;
  const ellipsisCharacters = 10; // Number of characters to show before the ellipsis
  if (!book.title) return null;
  let displayedTitle = book.title;
  if (book.title.length > maxCharacters) {
    displayedTitle = `${book.title.substring(0, maxCharacters - ellipsisCharacters)}...`;
  }

  const findLending = () => {
    if (book.UserBooks && book.UserBooks.length > 0) {
      book.UserBooks.forEach((entry: any) => {
        if (entry.userId === id && entry.owned === true) {
          setIsLendingLibrary(true);
        }
      });
    }
  };

  const findWishList = () => {
    if (book.UserBooks && book.UserBooks.length > 0) {
      book.UserBooks.forEach((entry: any) => {
        if (entry.userId === id && entry.wishList === true) {
          setIsWishListed(true);
        }
      });
    }
  };

  useEffect(() => {
    const newBackgroundImageUrl = storedMode === 'dark'
      ? 'url("https://nobe.s3.us-east-2.amazonaws.com/blackBook.jpg")'
      : 'url("https://nobe.s3.us-east-2.amazonaws.com/light-brown-leather-textured-background_53876-108003.jpg")';
    const newBottomColor = storedMode === 'dark' ? 'rgba(37, 37, 37, 0.6)' : 'rgba(122, 64, 14, 0.199)';
    setBottomColor(newBottomColor);
    setBackgroundImageUrl(newBackgroundImageUrl);
  }, [storedMode]);

  useEffect(() => {
    findLending();
    findWishList();
  }, [book]);

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onClick(e, book);
  };

  if (book.UserBooks && book.UserBooks.length > 0) {
    book.UserBooks.forEach((entry: any) => {
      if (entry.userId === id && entry.rating !== 0 && userRating === 0) {
        setUserRating(entry.rating);
      }
    });
  }
  if (showBigBook) {
    return (
      <BigBookOverlay bigBookPosition={bigBookPosition}>
        <BigBook
          book={book}
          id={id}
          userRating={userRating}
          setUserRating={setUserRating}
          onClose={() => onClose()}
          isWishlisted={isWishListed}
          setIsWishlisted={setIsWishListed}
          isLendingLibrary={isLendinglibrary}
          setIsLendingLibrary={setIsLendingLibrary}
        />
      </BigBookOverlay>
    );
  }

  return (

    <Card
      key={book.id}
      variant="outlined"
      className={classes.card}
      sx={{
        width: isMobile ? '70vw' : '18vw',
        height: isMobile ? '62vw' : '19.5vw',
        minHeight: isMobile ? '62vw' : '250px',
        maxHeight: isMobile ? '62vw' : '325px',
        minWidth: isMobile ? '70vw' : '200px',
        maxWidth: isMobile ? '70vw' : '325px',
        boxShadow: '0px 0px 25px  rgba(37, 37, 37, 0.6)',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: backgroundImageUrl,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '55%',
          overflow: 'hidden',
          margin: '0',
          padding: '0',
          backgroundColor: 'transparent',
          cursor: 'pointer',
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
        <Box onClick={handleOnClick}>
          <NearMeButton book={book} nearMeBooks={nearMeBooks} />
        </Box>
        <LendingLibraryButton
          book={book}
          isLendingLibrary={isLendinglibrary}
          setIsLendingLibrary={setIsLendingLibrary}
        />
        <WishListButton
          book={book}
          isWishListed={isWishListed}
          setIsWishListed={setIsWishListed}
        />
      </CardOverflow>
      <Typography
        onClick={handleOnClick}
        sx={{
          mt: 2.4,
          overflow: 'hidden',
          whiteSpace: isMobile ? 'wrap' : 'normal',
          flexWrap: 'wrap',
          textAlign: 'center',
          textOverflow: 'ellipsis',
          fontSize: isMobile ? '1.5rem' : '1.3rem',
          fontWeight: '500',
          lineHeight: '1.4rem',
        }}
      >
        {displayedTitle}
      </Typography>

      <Typography
        level="h6"
        sx={{
          mt: 'auto',
          mb: 'auto',
          whiteSpace: isMobile ? 'wrap' : 'nowrap',
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
          bgcolor: bottomColor,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }} />
        {book && id
        && (
        <UserStarRating
        // @ts-ignore
          book={book}
          id={id}
          userRating={userRating}
          setUserRating={setUserRating}
        />
        )}
      </CardOverflow>
    </Card>
  );
});

export default Book;
