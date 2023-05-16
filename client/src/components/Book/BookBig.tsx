/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/react-in-jsx-scope */
import react, { useState } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Box from '@mui/joy/Box';
import Button from '@mui/material/Button';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import UserStarRating from '../UserStarRating/UserStarRating';
import UserReview from '../UserStarRating/UserReview';
import Reviews from './Reviews';
import WishListButton from '../Button/WishListButton';
import LendingLibraryButton from '../Button/LendingLibraryButton';

function BigBook(props: any) {
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
      sx={{
        margin: '10px',
        display: 'flex',
        flexDirection: 'column',
        width: '80vw',
        height: '70vh',
        maxWidth: '600px',
        maxHeight: '1000px',
        overflow: 'auto',

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
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          width: ['100px', '25vw'], // use 300px for small screens, and 50vw for larger ones
          height: ['150px', '25vw'], // make height the same to keep aspect ratio 1:1
          maxWidth: '300px', // don't let the image get larger than this
          maxHeight: '400px',
          minWidth: '50px', // don't let the image get smaller than this
          minHeight: '75px',
        }}
      >
        <img
          src={book.image}
          loading="lazy"
          alt=""
          style={{
            objectFit: 'contain', // Use object-fit: contain to scale the image without stretching it
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
        <LendingLibraryButton book={book} />
        <WishListButton book={book} />
      </CardOverflow>
      <UserStarRating book={book} id={id} value={userRating} />
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Written Review
      </Button>
      <UserReview book={book} id={id} open={reviewOpen} handleClose={handleClose} />
      <Box sx={{ p: 3, flexGrow: 1, overflow: 'auto' }}>

        <span onClick={handleOnClick} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
          {book.title}
        </span>

        <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
          <Link href="#multiple-actions">{book.author}</Link>
        </Typography>
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
