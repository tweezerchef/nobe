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
