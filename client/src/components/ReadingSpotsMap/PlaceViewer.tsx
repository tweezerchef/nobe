import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Chip,
} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import useStyles from './styles';

interface Award {
    images: {
        small: string;
    };
    display_name: string;
}

interface Cuisine {
    name: string;
}

interface Place {
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
}

interface PlaceDetailsProps {
    place: Place;
    selected: string | null;
    refProp: React.MutableRefObject<HTMLElement | null>;
}

// const PlaceDetails: React.FC<PlaceDetailsProps> = () => {
// if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
// { place, selected, refProp }
function PlaceDetails() {
    const [place, setPlace] = useState<Place | null>(null);
    const classes = useStyles();

    useEffect(() => {
        // const response = axios.get(`https://maps.googleapis.com/maps/api/place/details/json
        // ?place_id=ChIJrTLr-GyuEmsRBfy61i59si0
        // &fields=address_components
        // &key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`).then((response) => { console.log(response) })
        // console.log(response);
        const response = axios.get('/api/places-to-read/getplace').then((response) => { console.log(response), setPlace(response.data.result); });
    }, []);
    return (

        <Card elevation={6}>
            <CardMedia
                style={{ height: 350 }}
                image={place?.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                title={place?.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">{place?.name}</Typography>
                <Box display="flex" justifyContent="space-between" my={2}>
                    <Rating name="read-only" value={Number(place?.rating)} readOnly />
                    <Typography component="legend">
                        {place?.num_reviews}
                        {' '}
                        review
                        {place?.num_reviews !== 1 && 's'}
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
                        <img src={award.images.small} />
                        <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                    </Box>
                ))}
                {place?.cuisine?.map(({ name }) => (
                    <Chip key={name} size="small" label={name} className={classes.chip} />
                ))}
                {place?.address && (
                    <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
                        <LocationOnIcon />
                        {place.address}
                    </Typography>
                )}
                {place?.phone && (
                    <Typography variant="body2" color="textSecondary" className={classes.spacing}>
                        <PhoneIcon />
                        {' '}
                        {place.phone}
                    </Typography>
                )}
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => window.open(place?.web_url, '_blank')}>
                    Trip Advisor
                </Button>
                <Button size="small" color="primary" onClick={() => window.open(place?.website, '_blank')}>
                    Website
                </Button>
            </CardActions>
        </Card>
    );
}

export default PlaceDetails;
