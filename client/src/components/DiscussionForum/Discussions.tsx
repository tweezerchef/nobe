/* eslint-disable max-len */
import React, { memo } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Box from '@mui/material/Box';
import { Discussion } from '../../typings/types';

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

  const allKeysMatch = keys1.every((key) => keys2.includes(key) && deepEqual(obj1[key], obj2[key]));
  if (!allKeysMatch) {
    return false;
  }
  return true;
}

const DiscussionList = memo(({ discussions, clubId }: DiscussionListProps) => {
  const sortedDiscussions = [...discussions].sort((a, b) => {
    const aLastPostTime = a.Posts?.length ? moment(a.Posts[a.Posts.length - 1].createdAt).valueOf() : 0;
    const bLastPostTime = b.Posts?.length ? moment(b.Posts[b.Posts.length - 1].createdAt).valueOf() : 0;
    return bLastPostTime - aLastPostTime;
  });

  return (
    <div>
      {sortedDiscussions?.map((discussion) => (
        <Box sx={{ my: 1 }}>
          <Card key={discussion.id} className="club-card" variant="outlined">
            <Link
              to={`/clubs/${clubId}/discussion/${discussion.id}`}
              style={{ color: 'black', textDecoration: 'none' }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center' }}>
                  {discussion.title}
                </Typography>
                <Typography
                  variant="body2"
                  className="club-card-body"
                  style={{
                    textAlign: 'center', fontSize: '16px', color: 'gray', paddingBottom: '3px',
                  }}
                >
                  {discussion.Posts && discussion.Posts.length === 1 ? '1 Post' : `${discussion.Posts?.length || 0} Posts`}
                </Typography>
                <Typography variant="body2" className="club-card-body" style={{ textAlign: 'center', fontSize: '12px', color: 'gray' }}>
                  Last post:
                  {' '}
                  {discussion.Posts && discussion.Posts.length > 0 ? (
                    moment(discussion.Posts[discussion.Posts.length - 1].createdAt).calendar(null, {
                      lastDay: '[Yesterday at] h:mma',
                      sameDay: '[Today at] h:mma',
                      lastWeek: 'dddd [at] h:mma',
                      sameElse: 'MMM D [at] h:mma',
                    })
                  ) : (
                    'No posts'
                  )}
                </Typography>
              </CardContent>
            </Link>
          </Card>
        </Box>
      ))}
    </div>

  );
}, deepEqual);

export default DiscussionList;
