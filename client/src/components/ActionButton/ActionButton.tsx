import * as React from 'react';
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
import { io } from "socket.io-client";
import MessageIcon from '../MessagesIcon/messagesicon';
import FriendIcon from '../NewFriendIcon/Newfriendicon';
import NotificationIcon from '../NotificationMessages/Notificationmessages';


const actions = [
  { icon: <NotificationIcon />, name: 'Notifications Feed' },
  { icon: <FriendIcon />, name: 'Friends' },
  { icon: <MessageIcon  />, name: 'Messages' },
  { icon: <CloseBy  />, name: 'Near By' },
];





  const OpenIconSpeedDial: React.FC = () => {

    // React.useEffect(() => {
    //   const socket = io("http://localhost:8080");
    //   console.log(socket.on('test', (msg)=> {
    //     console.log(msg);
    //   }));
    // }, []);




    return (
      <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<BookIcon openIcon={<EditIcon />} />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
      </Box>
    );
  }
  export default OpenIconSpeedDial;