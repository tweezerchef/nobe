/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import {
  Card, CardContent, Typography, Box,
} from '@mui/material';

type DiscussionListProps = {
  discussions: Discussion[];
  clubId: string;
};
function deepEqual(obj1: any, obj2: any) {
  if (obj1 === obj2) {
    return true;
  }

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

const DiscussionList = memo(({ discussions, clubId }: DiscussionListProps) => (
  <>
    {discussions?.map((discussion) => (
      <Box sx={{ my: 1 }}>
        <Card key={discussion.id} className="forum-card">
          <Link
            to={`/clubs/${clubId}/discussion/${discussion.id}`}
            style={{ color: 'black', textDecoration: 'none' }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center' }}>
                {discussion.title}
              </Typography>
              <Typography variant="body2" className="forum-card-body" style={{ textAlign: 'center' }}>
                Posts:
                {' '}
                {discussion.Posts && discussion.Posts.length}
              </Typography>
            </CardContent>
          </Link>
        </Card>
      </Box>
    ))}
  </>

), deepEqual);

export default DiscussionList;
