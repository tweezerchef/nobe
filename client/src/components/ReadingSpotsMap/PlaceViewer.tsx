/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState, useContext } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  Chip,
  Button,
  Grid,
  Divider,
  Tooltip,
  IconButton,
  TextField,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RecommendIcon from '@mui/icons-material/Recommend';
import axios from 'axios';

import ReviewPopOver from './ReviewPopOver';
import ReadingSpotsAdd from '../Button/ReadingSpotsAdd';
import UserContext from '../../hooks/Context';
import { Place, PlaceViewerProps } from '../../typings/types';

 type Review = {
   text: string;
 };

function PlaceDetails({ placeId, savedPlaces }: PlaceViewerProps) {
  const [place, setPlace] = useState<Place | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [appFavorite, setAppFavorite] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [google, setGoogle] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const reviewsPerPage = 5;
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const User_Places = user?.User_Places;

  useEffect(() => {
    axios.get(`/api/places-to-read/getplace?placeId=${placeId}`)
      .then((response) => {
        if (response.data.google === true) {
          setGoogle(true);
          const photo = response.data.place.result?.photos?.[0].photo_reference;
          setPlace(response.data.place.result);
          setImage(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
          if (response.data.place.result?.reviews) {
            setReviews(response.data.place.result?.reviews);
          }
        } else {
          setGoogle(false);
          setPlace(response.data.place);
          const photo = response.data.place.Places_Pictures[0].url;
          setImage(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
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
  return (
    <Grid container sx={{ boxSizing: 'content-box', overflow: 'auto' }}>
      <Grid item xs={12}>
        <Card
          elevation={6}
          sx={{
            height: '100%', width: '100%', display: 'flex', flexDirection: 'column', padding: 0, margin: 0,
          }}
        >
          <Grid container>
            <Grid item xs={12} sm={12} sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <CardMedia
                sx={{ height: { sm: '270px' }, width: '25%', objectFit: 'cover' }}
                image={image || undefined}
                title={place?.name}
              />
              <CardContent sx={{ padding: 0, margin: 0 }}>
                <Typography variant="h5">
                  {place?.name}
                  {appFavorite && (
                    <Tooltip title="One of your favorite places to read">
                      <RecommendIcon sx={{ color: 'green' }} />
                    </Tooltip>
                  )}
                  {place && (
                    <ReadingSpotsAdd
                      place={place}
                      favorite={favorite}
                      google={google}
                    />
                  )}
                  {place?.types.map((name: any) => (
                    <Chip key={name} size="small" label={name} sx={{ marginLeft: 1 }} />
                  ))}
                  {place?.website && (
                  <Button size="small" color="primary" onClick={() => window.open(place?.website, '_blank')}>
                    Website
                  </Button>
                  )}
                </Typography>
                <Rating name="read-only" value={Number(place?.rating)} readOnly />
                <Box display="flex" alignItems="flex-start">
                  <Box display="flex" flexDirection="column" alignItems="center">

                    <Box>
                      {place && reviews && reviews.length ? (
                        <>
                          <IconButton onClick={handlePrevPage} disabled={currentPage === 0}>
                            <KeyboardArrowUpIcon />
                          </IconButton>
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
                          <IconButton
                            onClick={handleNextPage}
                            disabled={
        currentPage
        >= Math.ceil((reviews.length || 0) / reviewsPerPage) - 1
      }
                          >
                            <KeyboardArrowDownIcon />
                          </IconButton>
                        </>
                      ) : (
                        <Typography>Loading reviews...</Typography>
                      )}
                    </Box>
                  </Box>

                  {/* TextField container */}
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
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

export default PlaceDetails;
