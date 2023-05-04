
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import BookIcon from '../NotificationBook/Notificationbook';
import CloseBy from '../CloseBy/CloseBy';
import { io, Socket } from "socket.io-client";
import MessageIcon from '../MessagesIcon/messagesicon';
import FriendIcon from '../NewFriendIcon/Newfriendicon';
import NotificationMessageIcon from '../NotificationMessages/Notificationmessages';
import Draggable from "react-draggable";
import ForumIcon from '../DiscussionForum/Discussionforum';
import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../hooks/Context'








const NotificationIcon: React.FC = () => {

  const [userFirstName, setUserFistName] = useState("");
  const [onlineUser, setOnlineUser] = useState("");
  const [socket, setSocket] = useState<any>(null);
  const [notifications, setNotifications] = useState<any>([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const userContext = useContext(UserContext);
  const user = userContext?.user;
  //const id = user.id;
  //console.log(user);

  const markAsRead = () => {
    setNotifications([])
    setNotificationCount(0);
  }
  //const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();
  // creating the notfication for adding a new friend
  //console.log(notifications, 64)
  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);
    newSocket.on('new-follower', (data: any) => {
      console.log(data, 65)
      const { sender, receiver, message } = data;
      setNotifications((prevMessage: any) => [...prevMessage, message]);
      let count = 0;
      count++
      setNotificationCount(count);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  //   React.useEffect(() => {
  //     setSocket(io("http://localhost:3000"));
  //  }, []);

  // React.useEffect(() => {
  //   console.log(socket.on('test', (msg: any)=> {
  //     console.log(msg);
  //   }));
  // }, []);

  // React.useEffect(() => {
  //   console.log(socket.on('test', (msg: any)=> {
  //     console.log(msg);
  //   }));
  // }, []);
  // console.log(notifications, 64)

  // useEffect(() => {
  //   const newSocket = io('http://localhost:3000');
  //   setSocket(newSocket);
  //   newSocket.onAny(() => {
  //     let count = 0;
  //     count++;
  //     setNotificationCount(count);
  //   })

  //   newSocket.on('connect_error', (error: any) => {
  //     console.log('Socket connection error:', error);
  //   });

  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }, []);

  //  React.useEffect(() => {
  //    if (socket) {
  //      socket?.emit("newUser", user);
  //    }
  //  }, [socket, user]);

  // const actions = [
  //   { icon: <NotificationIcon notifications={notifications} notificationCount={notificationCount} markAsRead={markAsRead} />, name: 'Notifications Feed' },
  //   { icon: <FriendIcon notificationCount={notificationCount} />, name: 'Friends' },
  //   { icon: <MessageIcon />, name: 'Messages' },
  //   { icon: <CloseBy />, name: 'Near By' },
  //   { icon: <ForumIcon />, name: 'Discussions' },
  // ];

  return (
<BookIcon notificationCount={notificationCount} notifications={notifications} markAsRead={markAsRead}/>


  );
}
export default NotificationIcon;

// <Draggable>
{/* // <Box sx={{ width: 100, height: 80, transform: 'translateZ(0px)', flexGrow: 1 }}> */ }
{/* // </Box> */ }
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