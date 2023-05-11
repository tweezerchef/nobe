import axios from 'axios';
import React, {
  useContext, useEffect, useState, useCallback,
} from 'react';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import IconButton from '@mui/joy/IconButton';
import { Tooltip } from '@material-ui/core';
import UserContext from '../../hooks/Context';

type CustomColor = 'success' | 'danger';
function ReadingSpotsAdd(props: any) {
  const { place, google } = props;
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const setUser = userContext?.setUser;
  const id = user?.id;
  const email = user?.email;
  const [color, setColor] = useState<CustomColor>('danger');
  const [toolTip, setToolTip] = useState<NonNullable<React.ReactNode>>('Add to My Reading Spots');
  useEffect(() => {
    let fav = false;
    user?.User_Places?.forEach((userPlace: { id: any;
      favorite: boolean; googlePlaceId: string }) => {
      if (userPlace.googlePlaceId === place.googlePlaceId && userPlace.favorite === true) {
        fav = true;
      }
    });
    if (fav) {
      setColor('success');
    } else {
      setColor('danger');
    }
  }, [place]);

  const addToMyPlaceList = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      const oldColor = color;
      const newColor = color === 'success' ? 'danger' : 'success';
      setColor(newColor as CustomColor);
      setToolTip(
        newColor === 'success'
          ? 'Remove from My Reading Spots'
          : 'Add to My Reading Spots',
      );
      try {
        await axios.post('/api/places-to-read/place', {
          id,
          email,
          color: oldColor,
          place,
          google,
        }).then((data) => {
          if (setUser && data?.data) {
            setUser(data?.data);
          }
        });
      } catch (error) {
        console.error(error);
      }
    },
    [id, email, place, color],
  );

  return (

    <Tooltip title={toolTip} placement="top-end">
      <IconButton
        aria-label="Add to My Reading Spots"
        size="md"
        variant="solid"
        color={color}
        sx={{
          position: 'relative',
          borderRadius: '50%',
          left: '.25rem',
          top: '.35rem',
          // bottom: 0,
          // transform: 'translateY(50%)',
        }}
        onClick={addToMyPlaceList}
      >
        <LocalMallIcon />
      </IconButton>
    </Tooltip>

  );
}

export default ReadingSpotsAdd;
