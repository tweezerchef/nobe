import axios from 'axios';
import React, {
  useContext, useEffect, useState, useCallback,
} from 'react';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import IconButton from '@mui/joy/IconButton';
import { Tooltip } from '@material-ui/core';
import { getLatLng, getGeocode } from 'use-places-autocomplete';
import UserContext from '../../hooks/Context';

type CustomColor = 'success' | 'danger';
function ReadingSpotsAdd(props: any) {
  const { placeId, Location } = props;
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const setUser = userContext?.setUser;
  const id = user?.id;
  const User_Places = user?.User_Places;
  const [color, setColor] = useState<CustomColor>('danger');
  const [toolTip, setToolTip] = useState<NonNullable<React.ReactNode>>('Add to My Reading Spots');
  const [myPlaces, setMyPlaces] = useState<boolean>(false);

  const addToMyPlaceList = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      const results = await getGeocode({ placeId });
      const { lat, lng } = await getLatLng(results[0]);
      console.log('upper', Location);
      axios.post('/api/places-to-read/place', {
        googlePlaceId: placeId,
        id,
        color,
        lat,
        lng,
        Location,
      });
      if (color === 'success') {
        setColor('danger' as CustomColor);
        setToolTip('Add to My Reading Spots');
      } else {
        setColor('success' as CustomColor);
        setToolTip('Remove from My Reading Spots');
      }
    },
    [Location, color, id, placeId],
  );
  useEffect(() => {
    if (User_Places && User_Places.length > 0) {
      User_Places.forEach((entry: any) => {
        // need to add some sort of if statement to check if the
        // placeId is in the user savedPlaces array
        if (entry.googlePlaceId === placeId) {
          setColor('success' as CustomColor);
          setToolTip(<h1>Remove from My Places</h1>);
        }
      });
    }
    console.log(Location);
  }, [placeId, addToMyPlaceList]);

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
          left: '5rem',
          // bottom: 0,
          // transform: 'translateY(50%)',
        }}
        onClick={addToMyPlaceList}
      >
        <BookmarkAddIcon />
      </IconButton>
    </Tooltip>

  );
}

export default ReadingSpotsAdd;
