import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import { set } from 'react-hook-form';

interface FollowButtonProps {
  friendId: string;
  friendIdArray: string[];
  userId: string;
}

function FollowButton({ friendId, friendIdArray, userId }: FollowButtonProps) {
  const [isFriend, setIsFriend] = useState(false);
  const [buttonText, setButtonText] = useState('Follow');

  function isFriendCheck() {
    if (friendIdArray.includes(friendId)) {
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
        axios.post('/api/friendship', { userId, friendId });
        setButtonText('Unfollow');
      } else {
        axios.delete('/api/friendship', { data: { userId, friendId } });
        setButtonText('Follow');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button variant="contained" onClick={follow}>
      {buttonText}
    </Button>
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
