import React, { useEffect, useState } from 'react';
import IconButton from '@mui/joy/IconButton';
import { Tooltip } from '@material-ui/core';
import styled, { keyframes } from 'styled-components';

import { Book } from '../../typings/types';

interface NearMeButtonProps {
  book: Book;
  nearMeBooks: string[];
}

const pulse = keyframes`
  0% {
    background-color: #ff9800;
  }
  50% {
    background-color: #fdfdfd6a;
  }
  100% {
    background-color: #ff0000cc;
  }
`;

const PulsingIconButton = styled(IconButton)`
  animation: ${pulse} 2s infinite;
`;

function NearMeButton({ book, nearMeBooks }: NearMeButtonProps) {
  const [nearMe, setNearMe] = useState(false);
  const goToBook = () => {
    console.log('go to book');
  };

  useEffect(() => {
    if (nearMeBooks?.includes(book.id)) {
      setNearMe(true);
    }
  }, [nearMeBooks, book]);

  if (nearMe) {
    return (
      <Tooltip title="This Book is Near By" placement="top-end">
        <PulsingIconButton
          aria-label="Add to Wishlist"
          size="sm"
          variant="solid"
          color="primary"
          sx={{
            position: 'absolute',
            zIndex: 2,
            borderRadius: '50%',
            left: '3%',
            bottom: 0,
            transform: 'translateY(50%)',
            width: '30px',
            height: '30px',
          }}
          onClick={goToBook}
        >
          <img
            src="https://nobe.s3.us-east-2.amazonaws.com/iconnear.png"
            alt="Wishlist"
            style={{
              height: '30px',
              width: '30px',
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
        </PulsingIconButton>
      </Tooltip>
    );
  }
  return null;
}

export default NearMeButton;
