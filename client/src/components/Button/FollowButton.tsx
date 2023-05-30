import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import IconButton from '@mui/joy/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

interface FollowButtonProps {
  friendId: string;
  friendIdArray: string[];
  userId: string;
  setFriendIdArray: React.Dispatch<React.SetStateAction<string[]>>;
}

function FollowButton({
  friendId, friendIdArray, userId, setFriendIdArray,
}: FollowButtonProps) {
  const [isFriend, setIsFriend] = useState(false);
  const [buttonText, setButtonText] = useState('Follow');
  const [button, setButton] = useState(<PersonAddIcon />);

  function isFriendCheck() {
    if (friendIdArray.includes(friendId)) {
      setButton(<PersonRemoveIcon />);
      setButtonText('Unfollow');
      setIsFriend(true);
    }
  }
  useEffect(() => {
    isFriendCheck();
  }, []);

  const follow = async () => {
    try {
      if (buttonText === 'Follow') {
        setFriendIdArray([friendId, ...friendIdArray]);
        setButton(<PersonRemoveIcon />);
        setButtonText('Unfollow');
        axios.post('/api/friendship', { userId, friendId });
      } else {
        setFriendIdArray?.(friendIdArray.filter((id) => id !== friendId));
        setButton(<PersonAddIcon />);
        setButtonText('Follow');
        axios.delete('/api/friendship', { data: { userId, friendId } });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Tooltip title={buttonText} placement="top-end">
      <IconButton
        aria-label="Lending Library"
        size="sm"
        variant="solid"
        sx={{
          position: 'absolute',
          zIndex: 2,
          borderRadius: '50%',
          right: '4rem', // Set right and top values
          top: '-.2rem',
        }}
        onClick={follow}
      >
        {button}
      </IconButton>
    </Tooltip>
  );
}

export default FollowButton;

// try {
//   if (socketUrl) {
//     const newSocket = io(socketUrl);
//     newSocket.emit('new-follow', {
//       message: `${userFirstName} has followed you`,
//     });
//   }
