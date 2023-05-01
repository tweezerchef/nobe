import React, { useState, useEffect, useRef, useContext } from 'react';
import { ChatContainer, ChatHeader, ChatBody, ChatFooter, ChatInput, ChatButton, ChatSidebar, SidebarHeader, SidebarBody, ConversationLink, ChatWrapper } from '../../Styled';
import UserContext from '../../hooks/Context';
import axios from 'axios';
import io from 'socket.io-client';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import moment from 'moment';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '800px',
    height: '60vh'
  },
  // headBG: {
  //   backgroundColor: '#e0e0e0'
  // },
  borderRight500: {
    borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: 'calc(100% - 100px)', // Deduct space for the input and the header
    overflowY: 'auto',
  },
  textField: {
    width: '100%',
  },
});

interface Message {
  text: string;
  name: string;
  sender: string;
}

interface Conversation {
  id: string;
  members: {
    id: string;
    firstName: string;
    username: string | null;
    email: string;
    googleId: string;
  }[];
  messages: {
    id: string;
    createdAt: string;
    text: string;
    isRead: boolean;
    senderId: string;
  }[];
}

function Chat() {

  const classes = useStyles();

  const [message, setMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConvo, setCurrentConvo] = useState<Conversation | null>(null);
  const [socket, setSocket] = useState<any>(null);

  const userContext = useContext(UserContext);
  const user = userContext?.user;


  const handleSend = (event: React.FormEvent) => {
    event.preventDefault();
    if (message.trim() !== '') {
      sendMessage(message);
      setMessage('');
      console.log(chatMessages)
    }
  };

  const sendMessage = async (message: string) => {
    if (currentConvo && user) {
      const newMessage = {
        text: message,
        senderId: user.id,
        createdAt: new Date(),
      };
      try {
        const response = await axios.post(`/direct-messages/${currentConvo.id}/messages`, newMessage);
        socket.emit('new-message', {
          conversationId: currentConvo.id,
          message: response.data,
        });
      } catch (error) {
        console.log('Error sending message:', error);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      if (message.trim() !== '') {
        sendMessage(message);
        setMessage('');
      }
    }
  };

  const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      try {
        const response = await axios.post('/conversations', {
          currentUser: user.id,
          otherUser: searchQuery
        });
        const newConversation: any = response.data;
        setConversations((prevConversations) => {
          const updatedConversations = [...prevConversations, newConversation];
          user.Conversations = updatedConversations;
          return updatedConversations
        });
        setCurrentConvo(newConversation);
      } catch (error) {
        console.error(error);
      }
      setSearchQuery('')
    }
  };

  useEffect(() => {
    setConversations(user.Conversations);
  }, []);

  useEffect(() => {
    const newSocket = io('http://ec2-3-19-30-206.us-east-2.compute.amazonaws.com:3000');
    setSocket(newSocket);
    newSocket.on('new-message', (data: any) => {
      const { conversationId, message } = data;
      if (conversationId === currentConvo?.id) {
        setChatMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, message];
          if (currentConvo) {
            const conversationIndex = user.Conversations.findIndex((conversation: Conversation) => conversation.id === currentConvo.id);
            if (conversationIndex !== -1) {
              user.Conversations[conversationIndex].messages = updatedMessages;
            }
          }
          return updatedMessages;
        });
      }
    });

    newSocket.on('connect_error', (error: any) => {
      console.log('Socket connection error:', error);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [currentConvo, user]);

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">Direct Messages</Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <Grid item xs={12} style={{ padding: '10px' }}>
            <TextField value={searchQuery} onKeyDown={handleSearch} onChange={(event) => setSearchQuery(event.target.value)} id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
          </Grid>
          <Divider />
          <List>
            {conversations.map((conversation: any, index: number) => {
              const otherUser = conversation.members.find((member: any) => member.firstName !== user.firstName);
              const otherUserName = otherUser ? otherUser.firstName : '';
              return (
                <ListItem button key={index} onClick={() => {
                  setCurrentConvo(conversation);
                  setChatMessages(conversation.messages);
                }}>
                  <ListItemText>{otherUserName}</ListItemText>
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={9}>
          <Grid container style={{ padding: '20px' }} alignItems="center">
            <Grid item xs={11}>
              <TextField
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={handleKeyDown}
                id="outlined-basic-email"
                label="Type Something"
                variant="outlined"
                className={classes.textField} // Apply the 100% width style
              />
            </Grid>
            <Grid container justifyContent="flex-end" item xs={1}>
              <Fab color="primary" aria-label="add">
                <SendIcon onClick={handleSend} />
              </Fab>
            </Grid>
          </Grid>
          <Divider />
          {currentConvo && (
            <List className={classes.messageArea}>
              {chatMessages.map((message: any, index: number) => {
                const sender = currentConvo.members.find((member: any) => member.id === message.senderId);
                const senderFirstName = sender ? sender.firstName : '';
                return (
                  <ListItem key={index}>
                    <Grid container>
                      <Grid item xs={12}>
                        <ListItemText primary={
                          <Typography align="right" component="span" variant="body2">
                            {senderFirstName} {moment(message.createdAt).isValid()
                              ? moment(message.createdAt).fromNow()
                              : 'just now'}
                          </Typography>
                        }></ListItemText>
                      </Grid>
                      <Grid item xs={12}>
                        <ListItemText secondary={
                          <Typography align="right" component="span" variant="body2">
                            {message.text}
                          </Typography>
                        }></ListItemText>
                      </Grid>
                    </Grid>
                  </ListItem>
                )
              })}
            </List>
          )}
        </Grid>
      </Grid>
    </div>
  );


}

export default Chat;
