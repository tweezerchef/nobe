/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect, useState } from 'react';
import Modal from '@mui/joy/Modal';
import Card from '@mui/joy/Card';
// import CardOverflow from '@mui/joy/CardOverflow';
import ModalClose from '@mui/joy/ModalClose';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import UserStarRating from '../UserStarRating/UserStarRating';
import UserReview from '../UserStarRating/UserReview';
import Reviews from './Reviews';
import LendingLibraryButtonBigBook from '../Button/LendingLibraryButtonBigBook';
import WishListButtonBigBook from '../Button/WishListButtonBigBook';
import BookOwnerNearMe from '../HomePage/NearMeUserBook/BookOwnerNearMe';

const useStyles = makeStyles({
  card: {
    // backgroundImage: 'url("https://i.imgur.com/Mjey231.jpg")',
    backgroundImage: 'url("https://media.istockphoto.com/id/1369274625/vector/abstract-diagonal-lines-white-background-with-smooth-stripes-minimal-website-backdrop.jpg?s=612x612&w=0&k=20&c=TEN1TaY7nkekMC5HbE6-F1T5Pe96bLx-Tu2Dugy3SYE=")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    /* Additional CSS properties */
  },
  modalContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    outline: 'none',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '80vw',
    maxHeight: '80vh',
    overflow: 'auto',
    padding: '16px',
  },
});

function BigBook(props: any) {
  const classes = useStyles();
  const [reviewOpen, setReviewOpen] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [description, setDescription] = useState<string>('');
  const [userBooks, setUserBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    book, id, onClose, userRating,
    setUserRating,
    isWishListed,
    setIsWishListed,
    isLendingLibrary,
    setIsLendingLibrary,
  } = props;
  const { ISBN10 } = book;

  const getBook = () => {
    axios.get(`/bookdata/userbooks?ISBN10=${ISBN10}`)
      .then((response) => {
        setUserBooks(response.data.UserBooks);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleOnClick = () => {
    onClose();
  };
  const handleClickOpen = () => {
    setReviewOpen(true);
  };

  const handleClose = () => {
    setReviewOpen(false);
  };

  const handleExpandDescription = () => {
    setShowDescriptionModal(true);
  };

  const handleCloseDescriptionModal = () => {
    setShowDescriptionModal(false);
  };
  useEffect(() => {
    getBook();
    if (book.description) {
      setDescription(book.description);
    } else {
      // correct this axios call
      axios.get('/google-books/ISBN10/Description', {
        params: { ISBN10: book.ISBN10 },
      })
        .then((response) => {
          setDescription(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    setIsLoading(false);
  }, []);

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      // @ts-ignore
      open={open}
      onClose={onClose}
      transitionDuration={700}
      // onClose={() => setOpen(false)}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <div>
        <Card
          key={book.id}
          variant="outlined"
          className={classes.card}
          sx={{
            boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.6)',
            width: '600px',
            minHeight: '60vh',
            maxHeight: '1500px',
            '@media (max-width: 768px)': {
              width: '80vw',
              height: '80vh',
            },
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.25s ease-in-out',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              width: '100%',
              height: 'auto',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: '40%', // Adjust the percentage as needed
                  height: '25vh',
                }}
              >
                {book.image ? (
                  <img
                    src={book.image}
                    loading="lazy"
                    alt=""
                    style={{
                      objectFit: 'cover', // Change objectFit to 'cover' to ensure all images are the same size
                      width: '100%',
                      height: '100%',
                      imageRendering: 'crisp-edges',
                    }}
                  />
                ) : (
                  <img
                    src="https://i.imgur.com/XrUd1L2.jpg"
                    loading="lazy"
                    alt=""
                    style={{
                      objectFit: 'cover', // Change objectFit to 'cover'
                      width: '100%',
                      height: '100%',
                      imageRendering: 'crisp-edges',
                    }}
                  />
                )}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '60%',
                  pl: 1,
                }}
              >
                <Typography
                  level="h4"
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    wordWrap: 'break-word',
                    textAlign: 'center',
                    marginTop: '1rem',
                  }}
                >
                  {book.title}
                </Typography>

                <Box sx={{
                  mt: 0.5, mb: 2, textAlign: 'center', margin: '8px',
                }}
                >
                  <Typography level="body1">{book.author}</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Stack direction="row" spacing={3} alignContent="center" alignItems="center">
                    <LendingLibraryButtonBigBook
                      book={book}
                      isLendingLibrary={isLendingLibrary}
                      setIsLendingLibrary={setIsLendingLibrary}
                    />
                    { book && isWishListed !== undefined
                    && setIsWishListed !== undefined
                    && isWishListed !== undefined
                    && (
                    <WishListButtonBigBook
                      book={book}
                      isWishListed={isWishListed}
                      setIsWishListed={setIsWishListed}
                    />
                    )}
                  </Stack>
                </Box>
                <UserStarRating
                  book={book}
                  id={id}
                  userRating={userRating}
                  setUserRating={setUserRating}
                />
              </Box>
            </Box>
          </Box>
          <ModalClose
            variant="outlined"
            sx={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.body',
            }}
            onClick={handleOnClick}
          />

          <Box sx={{
            p: 3,
            flexGrow: 1,
            width: '100%',
            overflow: 'auto',
            maxHeight: '100%',
          }}
          >
            <Box height="5rem">
              <Typography level="body1">
                {description?.length > 150 ? (
                  <>
                    {`${description?.slice(0, 150)}... `}
                    <Typography
                      component="span"
                      level="body1"
                      color="primary"
                      style={{ textDecoration: 'underline', cursor: 'pointer' }}
                      onClick={handleExpandDescription}
                    >
                      See More
                    </Typography>
                  </>
                ) : (
                  description
                )}
              </Typography>
            </Box>
            <Modal
              open={showDescriptionModal}
              onClose={handleCloseDescriptionModal}
              className={classes.modalContainer}
            >
              <Box className={classes.modalContent}>
                <Typography level="body1">{description}</Typography>
              </Box>
            </Modal>
            <Divider inset="context" />
            <Box sx={{
              display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '1rem',
            }}
            >
              <Typography level="body2" sx={{ align: 'center' }}>
                Owners Near You
              </Typography>
            </Box>
            <BookOwnerNearMe bookId={book.id} />
            <Box sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
              <Button variant="outlined" onClick={handleClickOpen}>
                Add Written Review
              </Button>
            </Box>
            <UserReview
              book={book}
              id={id}
              open={reviewOpen}
              handleClose={handleClose}
              setUserBooks={setUserBooks}
            />
            <Box
              sx={{
                display: 'flex',
                gap: 1.5,
                py: 1.5,
                px: 'var(--Card-padding)',
                bgcolor: 'background.level1',
                marginTop: '10px',
              }}
            >
              {' '}

              <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary', fontSize: 'md' }}>
                {userBooks && (
                  <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary', fontSize: 'md' }}>
                    <Reviews UserBooks={userBooks} />
                  </Typography>
                )}
              </Typography>

              <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }} />

            </Box>
          </Box>
        </Card>
      </div>
    </Modal>
  );
}

export default BigBook;
