import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import IconButton from '@mui/joy/IconButton';
import { Tooltip } from '@material-ui/core';
import UserContext from '../../hooks/Context';

interface WishListButtonProps {
  book: any
  isWishListed: boolean
  setIsWishListed: React.Dispatch<React.SetStateAction<boolean>>
}

type CustomColor = 'success' | 'danger';

function WishListButton({ book, isWishListed, setIsWishListed }: WishListButtonProps) {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const id = user?.id;
  const [color, setColor] = useState<CustomColor>('danger');
  const [toolTip, setToolTip] = useState<NonNullable<React.ReactNode>>(<h1>Add to Wishlist</h1>);

  const addToWishlist = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    axios.post('/user-books/wishlist', {
      book,
      id,
      color,
    });
    if (color === 'success') {
      setIsWishListed(false);
      setColor('danger' as CustomColor);
      setToolTip(<h1>Add to Wishlist</h1>);
    } else {
      setIsWishListed(true);
      setColor('success' as CustomColor);
      setToolTip(<h1>Remove from Wishlist</h1>);
    }
  };
  useEffect(() => {
    if (isWishListed) {
      setColor('success' as CustomColor);
      setToolTip(<h1>Remove from Wishlist</h1>);
    } else {
      setColor('danger' as CustomColor);
      setToolTip(<h1>Add to Wishlist</h1>);
    }
  }, [book, isWishListed]);

  return (

    <Tooltip title={toolTip} placement="top-end">
      <IconButton
        aria-label="Add to Wishlist"
        size="sm"
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

export default WishListButton;
