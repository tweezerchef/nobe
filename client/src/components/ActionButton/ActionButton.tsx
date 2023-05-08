/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-unused-vars */

import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import { io, Socket } from 'socket.io-client';
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import BookIcon from '../NotificationBook/Notificationbook';
import CloseBy from '../CloseBy/CloseBy';
import MessageIcon from '../MessagesIcon/messagesicon';
import FriendIcon from '../NewFriendIcon/Newfriendicon';
import NotificationMessageIcon from '../NotificationMessages/Notificationmessages';
import ForumIcon from '../DiscussionForum/Discussionforum';

import UserContext from '../../hooks/Context';

const NotificationIcon: React.FC = () => {
  const [userFirstName, setUserFistName] = useState('');
  const [onlineUser, setOnlineUser] = useState('');
  const [socket, setSocket] = useState<any>(null);
  const [notifications, setNotifications] = useState<any>([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [buttonState, setButtonState] = useState('idle');

  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const id = user?.id;
  // console.log(user);

  const markAsRead = async () => {
    setNotifications([]);
    setNotificationCount(0);
    setButtonState('loading');
    // console.log(userLongitude, userLongitude, 63)
    try {
      const res = await axios.delete(`/notifications/${id}`, {
      });
      // console.log(res, 68)
      setTimeout(() => {
        setButtonState('success');
      }, 2000);
    } catch (err) {
      // console.error(err);
    }
  };
  // console.log(notifications, 64);

  const socketUrl = process.env.SOCKET_URL;

  useEffect(() => {
    // const fetchOfflineNotifications = async () => {
    //   const response = await fetch(`/notifications/${id}?offline=true`);
    //   setNotifications(response);
    // };
    if (socketUrl && id) {
      const newSocket = io(socketUrl, {
        query: {
          userId: id,
        },
      });
      setSocket(newSocket);
      newSocket.on('new-notification', (data: any) => {
        // console.log(data, 62);
        setNotifications((prevNotifications: any) => [data, ...prevNotifications]);
        let count = 0;
        count += 1;
        setNotificationCount(count);
      });
      return () => {
        newSocket.disconnect();
      };
    }
  }, [id, socketUrl]);

  // useEffect(() => {
  //   const getOnlineNotifications = async () => {
  //     try {
  //       const response = await fetch(`/notifications/${id}?offline=false`);
  //       setNotifications(response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getOnlineNotifications();
  // }, []);

  return (
    // eslint-disable-next-line max-len
    <BookIcon notificationCount={notificationCount} notifications={notifications} markAsRead={markAsRead} buttonState={buttonState} />

  );
};
export default NotificationIcon;

// <Draggable>
// <Box sx={{ width: 100, height: 80, transform: 'translateZ(0px)', flexGrow: 1 }}> */ }
/* // </Box> */
// </Draggable>

// <SpeedDial
//   ariaLabel="SpeedDial openIcon example"
//   sx={{ top: 1, position: 'absolute' }}
//   icon={<BookIcon notificationCount={notificationCount} openIcon={<EditIcon />} />}
//   direction={'down'}
// >
//   {actions.map((action) => (
//     <SpeedDialAction
//       key={action.name}
//       icon={action.icon}
//       tooltipTitle={action.name}
//     />
//   ))}
// </SpeedDial>
