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
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import axios from 'axios';
import ReviewPopOver from './ReviewPopOver';

interface Award {
  images: {
    small: string;
  };
  display_name: string;
}

interface Cuisine {
  name: string;
}
interface Review {
  author_name: string;
  text: string;
}
interface Place {
  formatted_address: string;
  adr_address: string;
  photo?: {
    images: {
      large: {
        url: string;
      };
    };
  };
  name: string;
  rating: string;
  num_reviews: number;
  price_level: string;
  ranking: string;
  awards?: Award[];
  cuisine?: Cuisine[];
  address?: string;
  phone?: string;
  web_url: string;
  website: string;
  types: string[];
  reviews: Review[];
}

function PlaceDetails({ placeId }: { placeId: number }) {
  const [place, setPlace] = useState<Place | null>(null);
  const [image, setImage] = useState<string>('https://images.unsplash.com/photo-1583477716463-9c485c89f6e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');

  useEffect(() => {
    axios.get(`/api/places-to-read/getplace?placeId=${placeId}`).then((response) => {
      const photo = response.data.result?.photos?.[0].photo_reference;
      console.log(response.data.result);
      setPlace(response.data.result);
      setImage(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
    });
  }, [placeId]);
  return (

    <Grid container sx={{ height: '100%' }}>
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
            <Grid item xs={12} sm={6}>
              <CardMedia
                sx={{ paddingTop: '25%', width: '35%' }}
                image={image}
                title={place?.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CardContent>
                <Typography gutterBottom variant="h5">{place?.name}</Typography>
                <Box display="flex" justifyContent="space-between" my={2}>
                  <Rating name="read-only" value={Number(place?.rating)} readOnly />
                  <Typography component="legend">
                    {/* {place?.reviews}
                    {' '}
                    review
                    {place?.reviews !== 1 && 's'} */}
                    {place?.reviews?.map((review) => (
                      <ReviewPopOver review={review} />
                    ))}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography component="legend">Price</Typography>
                  <Typography gutterBottom variant="subtitle1">
                    {place?.price_level}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography component="legend">Ranking</Typography>
                  <Typography gutterBottom variant="subtitle1">
                    {place?.ranking}
                  </Typography>
                </Box>
                {place?.awards?.map((award) => (
                  <Box display="flex" justifyContent="space-between" my={1} alignItems="center">
                    {/* <img src={award.images.small} /> */}
                    <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                  </Box>
                ))}
                {place?.types?.map((name) => (
                  <Chip key={name} size="small" label={name} sx={{ marginRight: 1 }} />
                ))}
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
          <CardActions>
            <Button size="small" color="primary" onClick={() => window.open(place?.web_url, '_blank')}>
              Trip Advisor
            </Button>
            <Button size="small" color="primary" onClick={() => window.open(place?.website, '_blank')}>
              Website
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default PlaceDetails;
