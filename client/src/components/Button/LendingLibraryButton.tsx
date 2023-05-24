import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import IconButton from '@mui/joy/IconButton';
import { Tooltip } from '@material-ui/core';
import UserContext from '../../hooks/Context';
import User from '../../../../server/routes/User';

type CustomColor = 'success' | 'danger';
function LendingLibraryButton(props: any) {
  const { book } = props;
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const id = user?.id;
  const [color, setColor] = useState<CustomColor>('danger');
  const [toolTip, setToolTip] = useState<NonNullable<React.ReactNode>>(<h1>Add to Lending Library</h1>);

  const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    axios.post('/user-books/lendinglibrary', {
      book,
      id,
      color,
    // eslint-disable-next-line no-return-assign
    }).then((data) => (user?.UserBooks ? data.data : null));
    if (color === 'success') {
      setColor('danger' as CustomColor);
      setToolTip(<h1>Add to Lending Library</h1>);
    } else {
      setColor('success' as CustomColor);
      setToolTip(<h1>Remove from Lending Library</h1>);
    }
  };
  useEffect(() => {
    if (book.UserBooks && book.UserBooks.length > 0) {
      book.UserBooks.forEach((entry: any) => {
        if (entry.userId === id && entry.owned === true) {
          setColor('success' as CustomColor);
          setToolTip(<h1>Remove from Lending Library</h1>);
        }
      });
    }
  }, [book, id]);

  return (

    <Tooltip title={toolTip} placement="top-end">
      <IconButton
        aria-label="Lending Library"
        size="sm"
        variant="solid"
        color={color}
        sx={{
          position: 'absolute',
          zIndex: 2,
          borderRadius: '50%',
          right: '4rem',
          bottom: 0,
          transform: 'translateY(50%)',
        }}
        onClick={onClick}
      >
        <LibraryBooksIcon />
      </IconButton>
    </Tooltip>

  );
}

export default LendingLibraryButton;
