import * as React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import UserContext from '../hooks/Context'
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



interface Activity {
  createdAt: string;
  userId: string;
  type: string;
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

  const userId = user.id;
  const getFeed = async () => {
    try {
      const response = await axios.get('/api/activity', {
        params: {
          userId: userId,
        }
      });
      console.log(response.data);
      setActivity(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFeed();
  }, [])



  return (

    <>
      {activity.length === 0 && <div>loading</div>}
      {activity.length > 0 && (
        <Timeline position="alternate">
          {activity.map((data: Activity) => (
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
                {data.type === 'wishlist' ? (
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
                ) : null}
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant="h6" component="span">
                  {`${data.user.firstName} added ${data.book.title} to their wishlist`}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      )}
    </>
  );
}
