import * as React from 'react';
import {
  useState, useEffect, useRef, useContext,
} from 'react';
import axios from 'axios';
import moment from 'moment';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import StarIcon from '@mui/icons-material/Star';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import IconButton from '@mui/joy/IconButton';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import UserContext from '../hooks/Context';

interface Activity {
  createdAt: string;
  userId: string;
  type: string;
  description: string;
  user: {
    firstName: string;
    lastName: string;
  }
  book: {
    title: string;
  }
}

export default function CustomizedTimeline() {
  const [activity, setActivity] = useState<Activity[]>([]);

  const userContext = useContext(UserContext);
  const user = userContext?.user;

  const userId = user?.id;
  const getFeed = async () => {
    try {
      const response = await axios.get('/api/activity', {
        params: {
          userId,
        },
      });
      setActivity(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <>
      {activity.length === 0 && <div>loading</div>}
      {activity.length > 0 && (
        <Timeline position="alternate">
          {activity.sort((a, b) => {
            if (a.createdAt < b.createdAt) {
              return 1;
            } if (a.createdAt > b.createdAt) {
              return -1;
            }
            return 0;
          }).map((data: Activity) => (
            <TimelineItem key={data.createdAt}>
              <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                align="right"
                variant="body2"
                color="text.secondary"
              >
                {moment(data.createdAt).calendar()}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                {data.type.toLowerCase() === 'wishlist' ? (
                  <IconButton
                    aria-label="Like minimal photography"
                    size="md"
                    variant="solid"
                    color="danger"
                    sx={{
                    }}
                  >
                    <BookmarkAddIcon />
                  </IconButton>
                ) : data.type.toLowerCase() === 'review' ? (
                  <IconButton
                    aria-label="Like minimal photography"
                    size="md"
                    variant="solid"
                    color="primary"
                    sx={{
                    }}
                  >
                    <StarIcon />
                  </IconButton>
                )
                  : data.type.toLowerCase() === 'location' ? (
                    <IconButton
                      aria-label="Like minimal photography"
                      size="md"
                      variant="solid"
                      color="info"
                      sx={{
                      }}
                    >
                      <AddLocationIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      aria-label="Like minimal photography"
                      size="md"
                      variant="solid"
                      color="success"
                      sx={{
                      }}
                    >
                      <LocalMallIcon />
                    </IconButton>
                  )}
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant="h6" component="span">
                  {data.type.toLowerCase() === 'wishlist' ? (`${data.user.firstName} added ${data.book.title} to their wishlist`)
                    : data.type.toLowerCase() === 'review' ? (
                      (`${data.user.firstName} rated ${data.book.title} ${data.description} stars`)
                    )
                      : data.type.toLowerCase() === 'location' ? (
                        (`${data.user.firstName} added ${data.description} as a reading spot`)
                      )
                        : (
                          `${data.user.firstName} added ${data.book.title} to their owned books`
                        )}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      )}
    </>
  );
}
