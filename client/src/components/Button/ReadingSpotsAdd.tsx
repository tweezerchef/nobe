import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import IconButton from '@mui/joy/IconButton';
import { Tooltip } from '@material-ui/core';
import UserContext from '../../hooks/Context';

type CustomColor = 'success' | 'danger';
function ReadingSpotsAdd(props: any) {
  const { placeId, savedPlaces } = props;
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const { id } = user;
  const [color, setColor] = useState<CustomColor>('danger');
  const [toolTip, setToolTip] = useState<NonNullable<React.ReactNode>>('Add to My Reading Spots');

  const addToWishlist = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    axios.post('/user-books/wishlist', {
      id,
      color,
    });
    if (color === 'success') {
      setColor('danger' as CustomColor);
      setToolTip('Add to My Reading Spots');
    } else {
      setColor('success' as CustomColor);
      setToolTip('Remove from My Reading Spots');
    }
  };
  useEffect(() => {
    if (savedPlaces && savedPlaces.length > 0) {
      savedPlaces.forEach((entry: any) => {
        // need to add some sort of if statement to check if the
        // placeId is in the user savedPlaces array
        if (entry.altLoc === placeId && entry.wishlist === true) {
          setColor('success' as CustomColor);
          setToolTip(<h1>Remove from Wishlist</h1>);
        }
      });
    }
  }, [id]);

  return (

    <Tooltip title={toolTip} placement="top-end">
      <IconButton
        aria-label="Add to My Reading Spots"
        size="md"
        variant="solid"
        color={color}
        sx={{
          position: 'absolute',
          zIndex: 2,
          borderRadius: '50%',
          right: '1rem',
          bottom: 0,
          transform: 'translateY(50%)',
        }}
        onClick={addToWishlist}
      >
        <BookmarkAddIcon />
      </IconButton>
    </Tooltip>

  );
}

export default ReadingSpotsAdd;
