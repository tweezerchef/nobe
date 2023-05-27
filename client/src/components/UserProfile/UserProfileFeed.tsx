/* eslint-disable no-nested-ternary */
import * as React from 'react';
import {
  useState, useEffect, useRef, useContext,
} from 'react';
import axios from 'axios';
import moment from 'moment';

import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/joy/Stack';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';
import ArrowCircleDownRoundedIcon from '@mui/icons-material/ArrowCircleDownRounded';
import { User } from '../../typings/types';

interface Activity {
  id: string;
  createdAt: string;
  userId: string;
  type: string;
  description: string;
  user: {
    firstName: string;
    lastName: string;
    picture: string;
    username: string;
  }
  book: {
    title: string;
    image: string;
  }
}

interface CustomizedTimelineProps {
  user: User;
}

export default function UserProfileFeed({ user }: CustomizedTimelineProps) {
  const [activity, setActivity] = useState<Activity[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'up' | 'down' | undefined>('up');

  const userId = user?.id;

  const getFeed = async () => {
    try {
      const response = await axios.get('/api/activity', {
        params: {
          userId,
        },
      });
      setActivity(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const activityPerPage = 1;

  const handleNextPage = () => {
    setSlideDirection('up');
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setSlideDirection('down');
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        // justifyContent: 'center',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        paddingBottom: '0',
      }}
    >
      <IconButton
        onClick={handlePrevPage}
        disabled={currentPage === 0}
        sx={{
          marginBottom: '4rem', padding: 0, justifySelf: 'center',
        }}
      >
        <ArrowCircleUpRoundedIcon />
      </IconButton>

      <Box sx={{ position: 'relative', width: '90%', height: '100%' }}>
        {[...Array(Math.ceil(activity.length / activityPerPage))].map((_, index) => (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: currentPage === index ? 'block' : 'none',
            }}
          >
            <Slide direction={slideDirection} in={currentPage === index} mountOnEnter unmountOnExit>
              <Stack
                spacing={0}
                direction="column"
                maxWidth="100%"
                maxHeight="90%"
                alignContent="center"
                justifyContent="center"
              >
                {activity
                  .slice(index * activityPerPage, index * activityPerPage + activityPerPage)
                  .map((data: Activity) => (
                    <Box key={data.id}>
                      <Divider />
                      <div className="container">
                        <div style={{ display: 'flex' }}>
                          <div style={{ margin: '3%' }}>
                            <Avatar src={data.user?.picture} />
                          </div>
                          <div style={{ marginTop: '3%', marginRight: '3%' }}>
                            <span style={{ fontWeight: 'bold' }}>
                              {`${data.user.firstName}`}
                            </span>
                            <span style={{ marginLeft: '3%', color: 'grey' }}>
                              {`${moment(data.createdAt).startOf('hour').fromNow()}`}
                            </span>
                            <div>
                              {data.type.toLowerCase() === 'wishlist' ? (`Added ${data.book.title} to their wishlist`)
                                : data.type.toLowerCase() === 'review' ? (
                                  (`Rated ${data.book.title} ${data.description} stars`)
                                )
                                  : data.type.toLowerCase() === 'location' ? (
                                    (`Added ${data.description} as a reading spot`)
                                  )
                                    : (
                                      `Added ${data.book.title} to their owned books`
                                    )}
                              <div>
                                {data.type.toLowerCase() === 'wishlist' || data.type.toLowerCase() === 'owned' || data.type.toLowerCase() === 'review' ? (
                                  <img src={`${data.book.image}`} />
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>

                        <Divider />
                      </div>
                    </Box>
                  ))}
              </Stack>
            </Slide>
          </Box>
        ))}

      </Box>

      <IconButton
        onClick={handleNextPage}
        sx={{
          margin: 5, padding: 0, alignSelf: 'center', justifySelf: 'end',
        }}
        disabled={currentPage >= Math.ceil((activity.length || 0) / activityPerPage) - 1}
      >
        <ArrowCircleDownRoundedIcon />
      </IconButton>
    </Box>
  );
}
