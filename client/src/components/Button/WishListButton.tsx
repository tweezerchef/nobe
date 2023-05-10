import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import IconButton from '@mui/joy/IconButton';
import { Tooltip } from '@material-ui/core';
import UserContext from '../../hooks/Context';

type CustomColor = 'success' | 'danger';
function WishListButton(props: any) {
  const { book } = props;
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
      setColor('danger' as CustomColor);
      setToolTip(<h1>Add to Wishlist</h1>);
    } else {
      setColor('success' as CustomColor);
      setToolTip(<h1>Remove from Wishlist</h1>);
    }
  };
  useEffect(() => {
    if (book.UserBooks && book.UserBooks.length > 0) {
      book.UserBooks.forEach((entry: any) => {
        if (entry.userId === id && entry.wishlist === true) {
          setColor('success' as CustomColor);
          setToolTip(<h1>Remove from Wishlist</h1>);
        }
      });
    }
  }, [book, id]);

  return (

    <Tooltip title={toolTip} placement="top-end">
      <IconButton
        aria-label="Add to Wishlist"
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

export default WishListButton;
