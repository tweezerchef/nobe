import React, {
  useState, useEffect, useContext,
} from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import moment from 'moment';
import UserContext from '../../hooks/Context';
import Emojis from '../Emojis/Emojis';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '600px',
    height: '50vh',
  },
  // headBG: {
  //   backgroundColor: '#e0e0e0'
  // },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
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

type EmojiSelectHandler = (emoji: string) => void;

const socketUrl = process.env.SOCKET_URL;

function Chat() {
  const classes = useStyles();

  const [message, setMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConvo, setCurrentConvo] = useState<Conversation | null>(null);
  const [socket, setSocket] = useState<any>(null);

  const userContext = useContext(UserContext);
  const user = userContext?.user;

  const sendMessage = async (sentMessage: string) => {
    if (currentConvo && user) {
      const newMessage = {
        text: sentMessage,
        senderId: user.id,
        createdAt: new Date(),
      };
      try {
        const response = await axios.post(`/direct-messages/${currentConvo.id}/messages`, newMessage);
        socket.emit('new-message', {
          conversationId: currentConvo.id,
          newMessage: response.data,
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleEmojiSelect: EmojiSelectHandler = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      if (message.trim() !== '') {
        sendMessage(message);
        setMessage('');
      }
    }
  };

  const handleSend = () => {
    // event.preventDefault();
    if (message.trim() !== '') {
      sendMessage(message);
      setMessage('');
    }
  };

  const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      try {
        const response = await axios.post('/conversations', {
          currentUser: user.id,
          otherUser: searchQuery,
        });

        const newConversation: any = response.data;

        if (newConversation) {
          setConversations((prevConversations) => {
            const updatedConversations = [...prevConversations, newConversation];
            user.Conversations = updatedConversations;
            return updatedConversations;
          });
          setCurrentConvo(newConversation);
          setChatMessages(newConversation.messages);
        }
      } catch (error) {
        console.error(error);
      }
      setSearchQuery('');
    }
  };

  useEffect(() => {
    setConversations(user.Conversations);
  }, []);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (socketUrl && user) {
      const newSocket = io(socketUrl, {
        query: {
          userId: user.id,
        },
      });

      setSocket(newSocket);

      newSocket.on('new-message', (data: any) => {
        const { conversationId, newMessage } = data;

        const conversationIndex = conversations.findIndex(
          (conversation: Conversation) => conversation.id === conversationId,
        );

        if (conversationIndex !== -1) {
          if (currentConvo?.id === conversationId) {
            setChatMessages((prevMessages) => [...prevMessages, newMessage]);
          }
          const updatedConvo = {
            ...conversations[conversationIndex],
            messages: [...conversations[conversationIndex].messages, newMessage],
          };
          setConversations((prevConversations) => {
            const updatedConversations = [...prevConversations];
            updatedConversations[conversationIndex] = updatedConvo;
            user.Conversations[conversationIndex] = updatedConvo;
            return updatedConversations;
          });
        }
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [currentConvo, conversations, user]);

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            className="header-message"
            style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', background: '#002884', color: '#fff', borderRadius: '4px 4px 0px 0px',
            }}
          >
            Direct Messages
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection} style={{ background: '#fff' }}>
        <Grid item xs={3} className={classes.borderRight500} style={{ borderRadius: '0px 0px 0px 4px' }}>
          <Grid item xs={12} style={{ padding: '10px' }}>
            <TextField value={searchQuery} onKeyDown={handleSearch} onChange={(event) => setSearchQuery(event.target.value)} id="outlined-basic-email" label="Search Users" variant="outlined" fullWidth />
          </Grid>
          <Divider />
          <List>
            {conversations.map((conversation: any) => {
              const otherUser = conversation.members.find((member: any) => (
                member.firstName !== user.firstName
              ));
              const otherUserName = otherUser ? otherUser.firstName : '';
              return (
                <ListItem
                  button
                  key={conversation.id}
                  onClick={() => {
                    setCurrentConvo(conversation);
                    setChatMessages(conversation.messages);
                  }}
                >
                  <ListItemText>{otherUserName}</ListItemText>
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={9} direction="column" style={{ height: '100%' }}>
          {!currentConvo && (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%',
            }}
            >
              <Typography variant="h6" className="header-message">
                Select a conversation or start a new one.
              </Typography>
            </div>
          )}
          {currentConvo && (
            <>
              {(() => {
                const otherUser = currentConvo.members.find((member: any) => (
                  member.firstName !== user.firstName
                ));
                const otherUserFirstName = otherUser ? otherUser.firstName : '';
                return (
                  <Typography
                    variant="h6"
                    className="header-message"
                    style={{
                      display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#1976d2', color: '#FFF',
                    }}
                  >
                    {otherUserFirstName}
                  </Typography>
                );
              })()}
              <Divider />
              <List
                className={classes.messageArea}
                style={{
                  flexGrow: 1,
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column-reverse',
                }}
              >
                {chatMessages
                  .slice()
                  .reverse().map((chatMessage: any) => {
                    const sender = currentConvo.members.find((member: any) => (
                      member.id === chatMessage.senderId
                    ));
                    const senderFirstName = sender ? sender.firstName : '';
                    const isCurrentUser = sender && sender.id === user.id;
                    return (
                      <ListItem key={chatMessage.id}>
                        <Grid container>
                          <Grid item xs={12}>
                            <ListItemText primary={(
                              <Typography component="span" variant="body2" style={{ display: 'flex', justifyContent: isCurrentUser ? 'flex-end' : 'flex-start' }}>
                                <span style={{ margin: '0px 5px 0px 5px', fontWeight: 'bolder', color: isCurrentUser ? 'limegreen' : 'red' }}>
                                  {senderFirstName}
                                </span>
                                <span style={{ color: 'rgb(29, 155, 240)' }}>
                                  {moment(chatMessage.createdAt).isValid()
                                    ? moment(chatMessage.createdAt).fromNow()
                                    : 'just now'}
                                </span>
                              </Typography>
                            )}
                            />
                          </Grid>
                          <Grid item xs={12} style={{ textAlign: isCurrentUser ? 'right' : 'left' }}>
                            <Typography
                              component="span"
                              variant="body2"
                              style={{
                                margin: '0px 5px 0px 5px',
                                display: 'inline-block',
                                background: isCurrentUser ? '#1976d2' : 'lightgray',
                                padding: '2px 10px 2px 10px',
                                borderRadius: '16px',
                                color: isCurrentUser ? '#FFF' : 'black',
                              }}
                            >
                              {chatMessage.text}
                            </Typography>
                          </Grid>

                        </Grid>
                      </ListItem>
                    );
                  })}
              </List>
              <Grid container style={{ paddingTop: '10px' }} alignItems="center">
                <Grid item xs={11}>
                  <TextField
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyDown={handleKeyDown}
                    id="outlined-basic-email"
                    label="Send message..."
                    variant="outlined"
                    className={classes.textField}
                    style={{ padding: '0px 5px 0px 0px' }}
                    InputProps={{
                      endAdornment: (
                        <Emojis onSelect={handleEmojiSelect} />
                      ),
                    }}
                  />
                </Grid>
                <Grid container justifyContent="flex-end" item xs={1}>
                  <Fab color="primary" aria-label="add" style={{ height: 'auto', margin: '0px 5px 0px 0px' }}>
                    <SendIcon onClick={handleSend} />
                  </Fab>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default Chat;
