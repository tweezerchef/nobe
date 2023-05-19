/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { Rating, Tooltip } from '@mui/material';
import RecommendIcon from '@mui/icons-material/Recommend';
import WhatshotTwoToneIcon from '@mui/icons-material/WhatshotTwoTone';
import { Place } from '../../../typings/types';
import { PlaceCard1, StyledBigTypog } from './styles';

interface PlaceCardProps {
  place: Place;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  const { Places_Pictures, name } = place;
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    console.log(place);
    const fetchImage = async () => {
      const photo = Places_Pictures[0].url;
      const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
      setImage(imageUrl);
    };

    fetchImage();
  }, [Places_Pictures]);

  return (
    <PlaceCard1 variant="outlined">
      <AspectRatio ratio="2">
        {image ? (
          <img src={image} loading="lazy" alt="" />
        ) : (
          <img src="https://i.imgur.com/XrUd1L2.jpg" loading="lazy" alt="" />
        )}
      </AspectRatio>
      {name && (
      <StyledBigTypog>
        {name}
        <Tooltip title="One of our favorite places to read">
          <RecommendIcon sx={{ color: 'green' }} />
        </Tooltip>
        <Tooltip title="This Place Is HOT">
          <WhatshotTwoToneIcon color="warning" />
        </Tooltip>
      </StyledBigTypog>
      )}
    </PlaceCard1>

  );
};
export default PlaceCard;
