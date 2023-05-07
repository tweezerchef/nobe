import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
} from '@material-ui/core';
import UserContext from '../../hooks/Context';

type CustomColor = 'primary' | 'secondary';
interface Club {
  clubId: string
}

function JoinClubButton(props: any) {
  const { clubId } = props;
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const { id } = user;
  const [color, setColor] = useState<CustomColor>('secondary');

  const addToClub = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    axios.post('/api/clubs/join', {
      id,
      clubId,
    });
    if (color === 'primary') {
      setColor('secondary' as CustomColor);
    } else {
      setColor('primary' as CustomColor);
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
      setColor('primary' as CustomColor);
    }
  }, []);

  return (

  // <Tooltip title={toolTip} placement="top">
    <Button
      aria-label="Join Club"
      size="medium"
      variant="contained"
      color={color}
      onClick={addToClub}
    >
      {color === 'primary' ? 'Leave Club' : 'Join Club'}
    </Button>
  // </Tooltip>

  );
}

export default JoinClubButton;
