import React from 'react';
import { Link } from 'react-router-dom';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
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
        height: isMobile ? '62vw' : '20vw',
        minHeight: isMobile ? '62vw' : '250x',
        maxHeight: isMobile ? '62vw' : '290px',
        maxWidth: isMobile ? '70vw' : '350px',
        boxShadow: '0px 0px 15px  rgba(37, 37, 37, 0.425)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Link to={to}>
        <Box sx={{ position: 'relative' }}>

          <AspectRatio ratio="2">
            {image ? (
              <img src={image} loading="lazy" alt="" />
            ) : (
              <img src="https://i.imgur.com/XrUd1L2.jpg" loading="lazy" alt="" />
            )}
          </AspectRatio>
        </Box>
        <Box sx={{
          alignContent: 'center', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column',
        }}
        >
          {name && (
          <Typography
            level="h5"
            sx={{
              mt: 2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              alignContent: 'center',
              alignText: 'center',
              justifyContent: 'center',
              textOverflow: 'ellipsis',
            }}
          >
            {name}

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
              textAlign: 'center',
              backgroundColor: '#f0f0f081',
            }}
          >
            {description}
          </CardOverflow>
        </Box>
      </Link>
    </Card>

  );
}
export default ClubCard;

// <Tooltip title="This Club Is HOT">
// <WhatshotTwoToneIcon color="warning" />
// </Tooltip>
