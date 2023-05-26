import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';

interface FollowButtonProps {
  friendId: string;
  friends: string[];
  userId: string;
}

function FollowButton({ friendId, friends, userId }: FollowButtonProps) {
  const [isFriend, setIsFriend] = useState(false);
  const [buttonText, setButtonText] = useState('Follow');

  function isFriendCheck() {
    if (friends.includes(friendId)) {
      setIsFriend(true);
      setButtonText('Unfollow');
    }
  }
  useEffect(() => {
    isFriendCheck();
  }, []);
  const follow = async () => {
    try {
      if (buttonText === 'Follow') {
        axios.post('/api/friendship', { userId, friendId });
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
