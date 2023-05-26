import React, { useEffect, useState, useContext } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import UserContext from '../../hooks/Context';

interface FollowButtonProps {
  friendId: string;

}
interface Friendship {
  id: string;
  userId: string;
  friendId: string;

}

function UserProfileFollowButton({ friendId }: FollowButtonProps) {
  const [friendIdArray, setFriendIdArray] = useState<string[]>([]);
  const [isFriend, setIsFriend] = useState(false);
  const [buttonText, setButtonText] = useState('Follow');
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const userId = user?.id;

  function getFriendIds() {
    const friendIds = user?.friendships?.reduce((acc: string[], friendship: Friendship) => {
      if (friendship && friendship.friendId && friendship.friendId.length > 0) {
        acc.push(friendship.friendId);
      }
      return acc;
    }, []) || [];

    setFriendIdArray(friendIds);
  }

  function isFriendCheck() {
    if (friendIdArray.includes(friendId)) {
      setButtonText('Unfollow');
      setIsFriend(true);
    }
  }
  useEffect(() => {
    getFriendIds();
  }, []);

  useEffect(() => {
    isFriendCheck();
  }, [friendIdArray]);

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

export default UserProfileFollowButton;

// try {
//   if (socketUrl) {
//     const newSocket = io(socketUrl);
//     newSocket.emit('new-follow', {
//       message: `${userFirstName} has followed you`,
//     });
//   }
