import React from 'react';
import { Link } from 'react-router-dom';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Tooltip from '@mui/material/Toolbar';
import WhatshotTwoToneIcon from '@mui/icons-material/WhatshotTwoTone';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Club } from '../../../typings/types';

interface ClubCardProps {
  club: Club;
}

function ClubCard({ club } : ClubCardProps) {
  const to = `/clubs/${club.id}?name=${encodeURIComponent(club.name)}`;
  const { name, image, description } = club;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

      <Box sx={{ position: 'relative' }}>

        <AspectRatio ratio="2">
          {image ? (
            <img src={image} loading="lazy" alt="" />
          ) : (
            <img src="https://i.imgur.com/XrUd1L2.jpg" loading="lazy" alt="" />
          )}
        </AspectRatio>
      </Box>
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
            }}
          >
            {name}
            <Tooltip title="This Club Is HOT">
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
            {name}

            {description}

          </CardOverflow>
        </Link>
      </Tooltip>
    </Card>

  );
}
export default ClubCard;
