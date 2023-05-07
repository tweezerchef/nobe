import React, { useEffect, useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  Chip,
  CardActions,
  Button,
  Grid,
  Divider,
  Tooltip,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RecommendIcon from '@mui/icons-material/Recommend';
import PhoneIcon from '@mui/icons-material/Phone';
import axios from 'axios';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ReviewPopOver from './ReviewPopOver';
import ReadingSpotsAdd from '../Button/ReadingSpotsAdd';

function PlaceDetails({ placeId, savedPlaces }: PlaceViewerProps) {
  const [place, setPlace] = useState<Place | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [appFavorite, setAppFavorite] = useState<boolean>(false);

  useEffect(() => {
    axios.get(`/api/places-to-read/getplace?placeId=${placeId}`).then((response) => {
      const photo = response.data.result?.photos?.[0].photo_reference;
      setPlace(response.data.result);
      setImage(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
    });
    setAppFavorite(savedPlaces.some((place) => place.googlePlaceId === placeId));
  }, [placeId]);
  return (
    <Grid container sx={{ height: '100%', boxSizing: 'border-box', overflow: 'auto' }}>
      <Grid item xs={12}>
        <Card
          elevation={6}
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Grid container>
            <Grid item xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center' }}>
              <CardMedia
                sx={{ height: { xs: '200px', sm: '300px' }, width: '25%', objectFit: 'cover' }}
                image={image ?? undefined}
                title={place?.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {place?.name}
                  {appFavorite
                  && (
                  <Tooltip title="This is one of our favorite places to read!">
                    <RecommendIcon sx={{ color: 'green' }} />
                  </Tooltip>
                  )}
                  { place && (
                  <ReadingSpotsAdd placeId={place.place_id} Location={place?.formatted_address} />
                  )}
                </Typography>
                <Box display="flex" justifyContent="space-between" my={2}>
                  <Rating name="read-only" value={Number(place?.rating)} readOnly />
                  <Typography component="legend" sx={{ cursor: 'pointer' }}>
                    {place?.reviews?.map((review) => (
                      <>
                        <ReviewPopOver review={review} />
                        <Divider />
                      </>
                    ))}
                  </Typography>
                </Box>
                {place?.types?.map((name) => (
                  <Chip key={name} size="small" label={name} sx={{ marginRight: 1 }} />
                ))}
                {place?.website && (
                <Button size="small" color="primary" onClick={() => window.open(place?.website, '_blank')}>
                  Website
                </Button>
                )}
                {place?.address && (
                <Typography gutterBottom variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOnIcon />
                  {place?.formatted_address}
                </Typography>

                )}
                {place?.phone && (
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                  <PhoneIcon />
                  {place?.phone}
                </Typography>
                )}
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

export default PlaceDetails;
