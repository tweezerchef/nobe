/* eslint-disable no-nested-ternary */
import * as React from 'react';
import {
  useState, useEffect, useRef, useContext,
} from 'react';
import axios from 'axios';
import moment from 'moment';

import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import UserContext from '../hooks/Context';

interface Activity {
  createdAt: string;
  userId: string;
  type: string;
  description: string;
  user: {
    firstName: string;
    lastName: string;
    picture: string;
    username: string;
    id: string;
  }
  book: {
    title: string;
    image: string;
  }
}

export default function CustomizedTimeline() {
  const [activity, setActivity] = useState<Activity[]>([]);

  const navigate = useNavigate();

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
        activity.sort((a, b) => {
          if (a.createdAt < b.createdAt) {
            return 1;
          } if (a.createdAt > b.createdAt) {
            return -1;
          }
          return 0;
        }).map((data: Activity) => (
          <div className="container">
            <div style={{ display: 'flex' }}>
              <div style={{ margin: '3%' }}>
                <Avatar onClick={() => navigate(`/profile/${data.user?.id}`)} src={data.user?.picture} />
              </div>
              <div style={{ marginTop: '3%', marginRight: '3%' }}>
                <span style={{ fontWeight: 'bold' }} onClick={() => navigate(`/profile/${data.user?.id}`)}>
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
                      <img style={{ width: '200px' }} src={`${data.book.image}`} />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <Divider />
            {/* </CardContent>
          </Card> */}
          </div>
        ))
      )}
    </>
  );
}
