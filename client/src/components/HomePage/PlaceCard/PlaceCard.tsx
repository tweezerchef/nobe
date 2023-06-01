import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import {
  Rating, Tooltip, IconButton,
} from '@mui/material';
import RecommendIcon from '@mui/icons-material/Recommend';
import WhatshotTwoToneIcon from '@mui/icons-material/WhatshotTwoTone';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { makeStyles } from '@mui/styles';
import { Place } from '../../../typings/types';

interface PlaceCardProps {
  place: Place;
}
const useStyles = makeStyles((theme) => ({
  customTooltip: {
    backgroundColor: '#fdfdfd45',
  },
}));

function PlaceCard({ place } : PlaceCardProps) {
  const { Places_Pictures, name } = place;
  const [image, setImage] = useState<string | null>(null);
  const [currentPicIndex, setCurrentPicIndex] = useState(0);
  const to = place.googlePlaceId ? `/reading-spots/${place.googlePlaceId}` : '/reading-spots';
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const editorial = place.placeEditorial ? place.placeEditorial : 'a place to read';
  const classes = useStyles();

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
      const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
      setImage(imageUrl);
    };

    fetchImage();
  }, [Places_Pictures, currentPicIndex]);

  return (

    <Card
      variant="outlined"
      sx={{
        width: isMobile ? '70vw' : '22vw',
        height: isMobile ? '62vw' : '17vw',
        minHeight: isMobile ? '62vw' : '250px',
        maxHeight: isMobile ? '62vw' : '290px',
        maxWidth: isMobile ? '70vw' : '350px',
        boxShadow: '0px 0px 25px  rgba(37, 37, 37, 0.6)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {' '}
      <Tooltip
        title={<h1>{editorial}</h1>}
        placement="top"
      >
        <Box sx={{ position: 'relative' }}>

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
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            <NavigateNextIcon />
          </IconButton>
          )}

        </Box>
      </Tooltip>
      <Tooltip title="Take Me There">
        <Link to={to}>
          {name && (
          <Typography
            level="h5"
            sx={{
              mt: 2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              '-webkit-line-clamp': 2,
              '-webkit-box-orient': 'vertical',
              textAlign: 'center',
            }}
          >
            {name}
            <Tooltip title="One of our favorite places to read">
              <RecommendIcon sx={{ color: 'green' }} />
            </Tooltip>
            <Tooltip title="This Place Is HOT">
              <WhatshotTwoToneIcon color="warning" />
            </Tooltip>
          </Typography>
          )}
          <CardOverflow
            variant="soft"
            sx={{
              display: 'flex',
              gap: 1.5,
              py: 1.5,
              px: 'var(--Card-padding)',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f0f0f0',
            }}
          >
            <Typography level="body3" sx={{ fontWeight: 'md' }} />
            <Rating name="read-only" value={Number(place?.rating)} readOnly />
          </CardOverflow>
        </Link>
      </Tooltip>
    </Card>

  );
}
export default PlaceCard;
