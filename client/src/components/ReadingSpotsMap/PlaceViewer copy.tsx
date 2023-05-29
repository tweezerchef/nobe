/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState, useContext } from 'react';
import {
  Rating,
  Chip,
  Button,
  Divider,
  Tooltip,
  IconButton,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/joy/Typography';
import Box from '@mui/material/Box';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RecommendIcon from '@mui/icons-material/Recommend';
import axios from 'axios';
import AspectRatio from '@mui/joy/AspectRatio';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Stack from '@mui/joy/Stack';
import { display } from '@mui/system';
import ReviewPopOver from './ReviewPopOver';
import ReadingSpotsAdd from '../Button/ReadingSpotsAdd';
import UserContext from '../../hooks/Context';
import { Place, PlaceViewerProps } from '../../typings/types';
import Places from './places';

 type Review = {
   text: string;
 };
interface PlacesPictures {
  url: string;
  height: number;
  width: number;
  html_attributions: string[];
}

function PlaceDetails({ placeId, savedPlaces }: PlaceViewerProps) {
  const [place, setPlace] = useState<Place | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [appFavorite, setAppFavorite] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [google, setGoogle] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [Places_Pictures, setPlaces_Pictures] = useState<PlacesPictures[]>([]);
  const [currentPicIndex, setCurrentPicIndex] = useState(0);
  const reviewsPerPage = 5;
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const User_Places = user?.User_Places;

  useEffect(() => {
    axios.get(`/api/places-to-read/getplace?placeId=${placeId}`)
      .then((response) => {
        if (response.data.google === true) {
          setGoogle(true);
          setPlaces_Pictures(response.data.place.result?.photos);
          setPlace(response.data.place.result);
          if (response.data.place.result?.reviews) {
            setReviews(response.data.place.result?.reviews);
          }
        } else {
          setGoogle(false);
          setPlace(response.data.place);
          setPlaces_Pictures(response.data.place.Places_Pictures);
          if (response.data.place.userPlaces) {
            const reviews: Review[] = [];
            response?.data.place?.userPlaces?.forEach((userPlace: Review) => {
              if (userPlace.text) {
                reviews.push(userPlace);
              }
            });
            setReviews(reviews);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });

    // eslint-disable-next-line max-len
    setAppFavorite(savedPlaces.some((place: { googlePlaceId: any; }) => place.googlePlaceId === placeId));
    if (User_Places && User_Places.length > 0) {
      let isFavorite = false;
      for (const entry of User_Places) {
        if (entry.googlePlaceId === placeId && entry.favorite === true) {
          isFavorite = true;
          break;
        }
      }
      setFavorite(isFavorite);
    }
  }, [placeId]);

  const handleSubmitReview = async () => {
    const userId = user?.id;
    const googlePlaceId = placeId;
    try {
      await axios.post('/api/places-to-read/writtenReview', {
        userId,
        Review: userReview,
        googlePlaceId,
      }).then((response) => { console.log(response.data); });
      // Clear the input field after submission
      setUserReview('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
  const handleNextPage = () => {
    if (
      currentPage
      < Math.ceil((reviews?.length || 0) / reviewsPerPage) - 1
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextImage = () => {
    if (currentPicIndex < Places_Pictures.length - 1) {
      setCurrentPicIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentPicIndex > 0) {
      setCurrentPicIndex((prevIndex) => prevIndex - 1);
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      const photo = Places_Pictures[currentPicIndex].url;
      console.log(Places_Pictures);
      const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
      setImage(imageUrl);
    };

    fetchImage();
  }, [Places_Pictures, currentPicIndex]);
  return (
    <Box sx={{ width: '100%', maxHeight: '300px', display: 'flex' }}>

      <Box sx={{
        width: '30%',
        height: '100%',
        maxHeight: '100%',
        position: 'relative',
        mt: '1rem',
        ml: '1rem',
      }}
      >
        {place && (
        <ReadingSpotsAdd
          place={place}
          favorite={favorite}
          google={google}
        />
        )}
        <AspectRatio ratio="2">
          {image ? (
            <img src={image} loading="lazy" alt="" />
          ) : (
            <img src="https://i.imgur.com/XrUd1L2.jpg" loading="lazy" alt="" />
          )}
        </AspectRatio>
        {currentPicIndex > 0 && (
          <IconButton
            onClick={handlePrevImage}
            sx={{
              position: 'absolute',
              left: '5px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.7)', // semi-transparent white background
            }}
          >
            <NavigateBeforeIcon />
          </IconButton>
        )}
        {currentPicIndex < Places_Pictures.length - 1 && (
          <IconButton
            onClick={handleNextImage}
            sx={{
              position: 'absolute',
              right: '5px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.7)', // semi-transparent white background
            }}
          >
            <NavigateNextIcon />
          </IconButton>
        )}
        <Typography level="h5">
          {place?.name}
        </Typography>
      </Box>
      <Box sx={{
        width: '75%',
        height: '30vh',
        maxHeight: '290px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >

          {/* {appFavorite && (
            <Tooltip title="One of your favorite places to read">
              <RecommendIcon sx={{ color: 'green' }} />
            </Tooltip>
            )} */}

          {/* {place?.types.map((name: any) => (
              <Chip key={name} size="small" label={name} sx={{ marginLeft: 1 }} />
            ))} */}
          {place?.website && (
            <Button size="small" color="primary" onClick={() => window.open(place?.website, '_blank')}>
              Website
            </Button>
          )}

          <Rating name="read-only" value={Number(place?.rating)} readOnly />
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          sx={{
            height: '100%',
          }}
        >

          {place && reviews && reviews.length && (
          <>
            <IconButton onClick={handlePrevPage} disabled={currentPage === 0}>
              <KeyboardArrowUpIcon />
            </IconButton>
            <Typography level="body1" sx={{ marginLeft: 1, marginRight: 1 }}>
              {reviews
                .slice(
                  currentPage * reviewsPerPage,
                  currentPage * reviewsPerPage + reviewsPerPage,
                )
                .map((review, index) => (
                  <React.Fragment key={index}>
                    <ReviewPopOver review={review} />
                    <Divider />
                  </React.Fragment>
                ))}
            </Typography>
            <IconButton
              onClick={handleNextPage}
              disabled={currentPage >= Math.ceil((reviews.length || 0) / reviewsPerPage) - 1}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
          </>
          ) }

        </Box>
      </Box>
      <Box sx={{ marginLeft: 2, display: 'flex', flexDirection: 'column' }}>
        <TextField
          label="review"
          multiline
          rows={4}
          variant="outlined"
          value={userReview}
          onChange={(event) => setUserReview(event.target.value)}
          sx={{ marginBottom: 0 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitReview}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default PlaceDetails;
