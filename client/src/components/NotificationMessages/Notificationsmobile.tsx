/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/function-component-definition */
import React from 'react';
// { useState, useContext, useEffect }
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
// import { io, Socket } from "socket.io-client";
import Counter from './style';
import Button from '../Button/Button';

interface NotificationIconProps {
  notifications: any;
  notificationCount: number;
  markAsRead: any;
}

// eslint-disable-next-line max-len
const NotificationMobile: React.FC<NotificationIconProps> = ({ notificationCount, notifications, markAsRead }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  // const [socket, setSocket] = useState<any>(null);
  // const [notifications, setNotifications] = useState<any>([]);
  // const [notificationCount, setNotificationCount] = useState(0);

  // console.log(notifications, 64)
  // useEffect(() => {
  //   const newSocket = io('http://localhost:3000');
  //   setSocket(newSocket);
  //   newSocket.on('new-follower', (data: any) => {
  //     console.log(data, 65 )
  //     const { sender, receiver, message } = data;
  //     setNotifications((prevMessage: any) => [...prevMessage, message]);
  //     let count = 0;
  //     count++
  //     setNotificationCount(count);
  //   });

  //   newSocket.on('connect_error', (error: any) => {
  //     console.log('Socket connection error:', error);
  //   });

  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }, []);

  // const displayNotifications = () => {
  //   let action;
  // if(type === 1){
  //   action= "has followed"
  // } else if (type === 2){
  //   action = "has messaged"
  // } else if (type === 3){
  //   action = "has added books that are near"
  // } else {
  //   action = "has added a new book to discussion for"
  // }
  // return (
  //   <span className='notification'>{`${senderName} ${action} you` </span>
  // )
  // }

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
          maxHeight: '80vh',
          overflow: 'auto',
        }}
      >
        <ModalClose
          variant="outlined"
          sx={{
            top: 'calc(-1/4 * var(--IconButton-size))',
            right: 'calc(-1/4 * var(--IconButton-size))',
            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
            borderRadius: '50%',
            bgcolor: 'background.body',
          }}
          onClick={() => setOpen(false)}
        />
        <Typography id="modal-modal-title" component="h2">
          <Button onClick={markAsRead}> Mark As Read </Button>
        </Typography>
        <Typography id="modal-desc" textColor="text.tertiary">
          { notifications.map((message: any) => <div>{message}</div>)}
        </Typography>
      </Sheet>
    </Modal>
  );
};

export default NotificationMobile;
