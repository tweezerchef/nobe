/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from 'react';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Box from '@mui/joy/Box';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import UserStarRating from '../UserStarRating/UserStarRating';
import UserReview from '../UserStarRating/UserReview';
import Reviews from './Reviews';
import LendingLibraryButtonBigBook from '../Button/LendingLibraryButtonBigBook';
import WishListButtonBigBook from '../Button/WishListButtonBigBook';

const useStyles = makeStyles({
  card: {
    backgroundImage: 'url("https://i.imgur.com/Mjey231.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    /* Additional CSS properties */
  },
});

function BigBook(props: any) {
  const classes = useStyles();
  const [reviewOpen, setReviewOpen] = useState(false);
  const {
    book, id, onClose, userRating,
  } = props;
  const UserBooks = book?.UserBooks;
  const handleOnClick = () => {
    onClose();
  };

  const handleClickOpen = () => {
    setReviewOpen(true);
  };

  const handleClose = () => {
    setReviewOpen(false);
  };

  return (
    <Card
      key={book.id}
      variant="outlined"
      className={classes.card}
      sx={{
        margin: '10px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '70vw',
        height: '90vh',
        maxWidth: '675px',
        maxHeight: '1000px',
        overflow: 'auto',
        // backgroundImage: 'url("https://imgbox.com/Frdz4hjN")',
        '@media (max-width: 768px)': {
          width: '80vw',
          height: '80vh',
        },
      }}
    >
      <CardOverflow
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          width: ['100px', '25vw'],
          height: ['150px', '25vw'],
          maxWidth: '300px',
          maxHeight: '400px',
          minWidth: '50px',
          minHeight: '75px',
        }}
      >
        <img
          src={book.image}
          loading="lazy"
          alt=""
          style={{
            objectFit: 'contain',
            position: 'absolute',
            top: 0,
            left: 0,
            paddingTop: '15px',
            width: '100%',
            height: '100%',
            imageRendering: 'crisp-edges',
          }}
          onClick={handleOnClick}
        />
        {/* <LendingLibraryButton book={book} />
        <WishListButton book={book} /> */}
      </CardOverflow>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          justifyContent: 'center',
          pl: 2,
        }}
      >
        <Typography level="h4" onClick={handleOnClick} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
          {book.title}
        </Typography>
        <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
          <Link href="#multiple-actions">{book.author}</Link>
        </Typography>

        <UserStarRating book={book} id={id} value={userRating} />
        <Button variant="outlined" onClick={handleClickOpen} sx={{ mt: 1 }}>
          Add Written Review
        </Button>
        <UserReview book={book} id={id} open={reviewOpen} handleClose={handleClose} />
        <WishListButtonBigBook paddingTop="15px" book={book} />
        <LendingLibraryButtonBigBook paddingTop="15px" book={book} />
      </Box>
      <Box sx={{ p: 3, flexGrow: 1, overflow: 'auto' }}>

        <Typography level="body1">
          {book.description}
        </Typography>
        <Typography level="body2">
          Placeholder Data 2:
          {' '}
          {book.placeholderData2}
        </Typography>
        <Typography level="body2">
          Placeholder Data 3:
          {' '}
          {book.placeholderData3}
        </Typography>
        <Divider inset="context" />
        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            py: 1.5,
            px: 'var(--Card-padding)',
            bgcolor: 'background.level1',
          }}
        >
          <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary', fontSize: 'md' }}>
            {UserBooks && (
            <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary', fontSize: 'md' }}>
              <Reviews UserBooks={UserBooks} />
            </Typography>
            )}
          </Typography>
          <Divider orientation="vertical" />
          <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }} />

        </Box>
      </Box>
    </Card>

  );
}

export default BigBook;
