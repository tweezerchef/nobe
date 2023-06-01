/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/function-component-definition */
import React, { ReactNode } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/joy/Box';

interface BookCardProps {
  book: {
    rank: any;
    weeks_on_list: ReactNode;
    rank_last_week: any;
    book_image: string;
    title: string;
    author: string;
    primary_isbn10: string;
  }
}

const TrendingCard: React.FC<BookCardProps> = ({ book }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      key={book.primary_isbn10}
      sx={{
        width: isMobile ? '70vw' : '23vw',
        height: isMobile ? '62vw' : '22vw',
        minHeight: isMobile ? '62vw' : '280px',
        maxHeight: isMobile ? '62vw' : '340px',
        minWidth: isMobile ? '70vw' : '260px',
        maxWidth: isMobile ? '70vw' : '320px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box width="100%" height="55%" onClick={() => navigate('/trending')}>
        <img
          src={book.book_image ? book.book_image : 'https://i.imgur.com/XrUd1L2.jpg'}
          loading="lazy"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            cursor: 'pointer',
          }}
        />
      </Box>
      <Typography
        onClick={() => navigate('/trending')}
        sx={{
          mt: 2.4,
          overflow: 'hidden',
          whiteSpace: isMobile ? 'wrap' : 'normal',
          flexWrap: 'wrap',
          textAlign: 'center',
          textOverflow: 'ellipsis',
          fontSize: isMobile ? '1.7rem' : '1.2rem',
          fontWeight: '500',
          lineHeight: '1.3rem',
          cursor: 'pointer',
        }}
      >
        {book.title}
      </Typography>
      <Typography
        level="h6"
        sx={{
          mt: 'auto',
          mb: 'auto',
          whiteSpace: isMobile ? 'wrap' : 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textAlign: 'center',
        }}
      >
        <Link href="#multiple-actions">{book.author}</Link>
      </Typography>
      <Divider inset="context" />
      <CardOverflow
        variant="soft"
        sx={{
          display: 'flex',
          gap: 1.5,
          py: 1.5,
          px: 'var(--Card-padding)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary', fontSize: 'md' }}>
          {book.rank}
        </Typography>
        <Divider orientation="vertical" />
        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
          {book.rank > book.rank_last_week ? <TrendingUpIcon sx={{ color: 'green', fontSize: 'md' }} />
            : book.rank < book.rank_last_week ? <TrendingDownIcon sx={{ color: 'red', fontSize: 'md' }} />
              : <TrendingFlatIcon sx={{ color: 'grey', fontSize: 'md' }} />}
        </Typography>
        <Divider orientation="vertical" />
        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary', fontSize: 'md' }}>
          {book.weeks_on_list}
          <WhatshotIcon sx={{ color: 'orange', fontSize: 'md' }} />
        </Typography>
      </CardOverflow>
    </Card>
  );
};

export default TrendingCard;
