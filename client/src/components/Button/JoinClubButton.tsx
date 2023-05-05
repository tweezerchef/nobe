import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import IconButton from '@mui/joy/IconButton';
import GroupsIcon from '@mui/icons-material/Groups';
import { Tooltip } from '@material-ui/core';
import UserContext from '../../hooks/Context';

type CustomColor = 'success' | 'danger';
interface Club {
  clubId: string
}

function JoinClubButton(props: any) {
  const { clubId } = props;
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const { id } = user;
  const [color, setColor] = useState<CustomColor>('danger');
  const [toolTip, setToolTip] = useState<NonNullable<React.ReactNode>>(<h1>Join Club</h1>);

  const addToClub = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    axios.post('/api/clubs/join', {
      id,
      clubId,
    });
    if (color === 'success') {
      setColor('danger' as CustomColor);
      setToolTip(<h1>Join Club</h1>);
    } else {
      setColor('success' as CustomColor);
      setToolTip(<h1>Leave Club</h1>);
    }
  };
  const member = user.clubMembers?.reduce((acc: boolean, club: Club) => {
    if (club.clubId === clubId) {
      acc = true;
      return acc;
    }
    return acc;
  }, false);
  useEffect(() => {
    if (member) {
      setColor('success' as CustomColor);
      setToolTip(<h1>Leave Club</h1>);
    }
  }, []);

  return (

    <Tooltip title={toolTip} placement="top">
      <IconButton
        aria-label="Join Club"
        size="md"
        variant="solid"
        color={color}
        // sx={{
        //   position: 'absolute',
        //   zIndex: 2,
        //   borderRadius: '50%',
        //   right: '1rem',
        //   bottom: 0,
        //   // transform: 'translateY(50%)',
        // }}
        onClick={addToClub}
      >
        <GroupsIcon />
      </IconButton>
    </Tooltip>

  );
}

export default JoinClubButton;
