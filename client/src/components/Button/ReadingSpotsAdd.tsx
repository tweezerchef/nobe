import axios from 'axios';
import React, {
  useContext, useEffect, useState, useCallback,
} from 'react';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import IconButton from '@mui/joy/IconButton';
import { Tooltip } from '@material-ui/core';
// import { getLatLng, getGeocode } from 'use-places-autocomplete';
import UserContext from '../../hooks/Context';

type CustomColor = 'success' | 'danger';
function ReadingSpotsAdd(props: any) {
  const { place, favorite } = props;
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const setUser = userContext?.setUser;
  const id = user?.id;
  const email = user?.email;
  const [color, setColor] = useState<CustomColor>('danger');
  const [toolTip, setToolTip] = useState<NonNullable<React.ReactNode>>('Add to My Reading Spots');
  useEffect(() => {
    if (favorite) {
      setColor('success' as CustomColor);
      setToolTip('Remove from My Reading Spots');
    } else {
      setColor('danger' as CustomColor);
      setToolTip('Add to My Reading Spots');
    }
  }, [favorite]);

  const addToMyPlaceList = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      const newColor = color === 'success' ? 'danger' : 'success';
      setColor(newColor as CustomColor);
      setToolTip(
        newColor === 'success'
          ? 'Remove from My Reading Spots'
          : 'Add to My Reading Spots',
      );
      // const results = await getGeocode({ placeId });
      // const { lat, lng } = await getLatLng(results[0]);
      try {
        await axios.post('/api/places-to-read/place', {
          id,
          email,
          color,
          place,
          favorite,
        }).then((data) => {
          // console.log('data', data);
          if (setUser && data?.data) {
            setUser(data?.data);
          }
        });
      } catch (error) {
        console.error(error);
      }
    },
    [id, email, place],
  );

  return (

    <Tooltip title={toolTip} placement="top-end">
      <IconButton
        aria-label="Add to My Reading Spots"
        size="md"
        variant="solid"
        color={color}
        sx={{
          // position: 'absolute',
          // zIndex: 2,
          // borderRadius: '50%',
          left: '1rem',
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
