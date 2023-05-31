import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import UserContext from '../../hooks/Context';
import { Book } from '../../typings/types';

type CustomColor = 'success' | 'danger';

interface LendingLibraryButtonProps {
  book: Book
  isLendingLibrary: boolean
  setIsLendingLibrary: React.Dispatch<React.SetStateAction<boolean>>
}

function LendingLibraryButton({ book, isLendingLibrary, setIsLendingLibrary }:
LendingLibraryButtonProps) {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const id = user?.id;
  const [color, setColor] = useState<CustomColor>('danger');
  // eslint-disable-next-line max-len
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
      setIsLendingLibrary(false);
      setColor('danger' as CustomColor);
      setToolTip(<h1>Add to Lending Library</h1>);
    } else {
      setIsLendingLibrary(true);
      setColor('success' as CustomColor);
      setToolTip(<h1>Remove from Lending Library</h1>);
    }
  };
  useEffect(() => {
    if (isLendingLibrary) {
      setColor('success' as CustomColor);
      setToolTip(<h1>Remove from Lending Library</h1>);
    } else {
      setColor('danger' as CustomColor);
      setToolTip(<h1>Add to Lending Library</h1>);
    }
  }, [book, isLendingLibrary]);

  return (

    <Tooltip title={toolTip} placement="top-end">
      <IconButton
        aria-label="Lending Library"
        size="lg"
        variant="solid"
        color={color}
        sx={{
          borderRadius: '50%',
          my: 1,
        }}
        onClick={onClick}
      >
        <LibraryBooksIcon />
      </IconButton>
    </Tooltip>

  );
}

export default LendingLibraryButton;
