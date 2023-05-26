import React, { useState } from 'react';
import Button from '@mui/material/Button';

function FollowButton() {
  const [isFriend, setIsFriend] = useState(false);

  const handleUnfollow = () => {
    setIsFriend(false);
  };

  const handleFollow = () => {
    setIsFriend(true);
  };

  return (
    <div />
  );
}

export default FollowButton;
