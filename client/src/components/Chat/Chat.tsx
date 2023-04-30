import React, { useState, useEffect, useRef, useContext } from 'react';
import { ChatContainer, ChatHeader, ChatBody, ChatFooter, ChatInput, ChatButton, ChatSidebar, SidebarHeader, SidebarBody, ConversationLink, ChatWrapper } from '../../Styled';
import UserContext from '../../hooks/Context';
import axios from 'axios';
import io from 'socket.io-client';

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
  const [message, setMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConvo, setCurrentConvo] = useState<Conversation | null>(null);
  const [socket, setSocket] = useState<any>(null);

  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const id = user.id

  const handleSend = (event: React.FormEvent) => {
    event.preventDefault();
    if (message.trim() !== '') {
      sendMessage(message);
      setMessage('');
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
        setChatMessages([...chatMessages, response.data]);
        socket.emit('new-message', {
          conversationId: currentConvo.id,
          message: response.data,
        });
      } catch (error) {
        console.log('Error sending message:', error);
      }
    }
  };


  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);
    newSocket.on('new-message', (data: any) => {
      const { conversationId, message } = data;
      if (conversationId === currentConvo?.id) {
        setChatMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    newSocket.on('connect_error', (error: any) => {
      console.log('Socket connection error:', error);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [currentConvo]);

  useEffect(() => {
    setConversations(user.Conversations);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      sendMessage(message);
      setMessage('');
    }
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('/conversations', {
        currentUser: id,
        otherUser: searchQuery
      });
      const newConversation: any = response.data;
      setConversations(prevConversations => [...prevConversations, newConversation]);
      setCurrentConvo(newConversation);
    } catch (error) {
      console.error(error);
    }
    setSearchQuery('')
  };

  return (
    <ChatContainer>
      <ChatWrapper>
        <ChatSidebar>
          <SidebarHeader>Conversations</SidebarHeader>
          <SidebarBody>
            <form onSubmit={handleSearch}>
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
                <button type="submit">Search</button>
              </div>
            </form>
            {conversations.map((conversation: any, index: number) => {
              const otherUser = conversation.members.find((member: any) => member.firstName !== user.firstName);
              const otherUserName = otherUser ? otherUser.firstName : '';
              return <ConversationLink
                key={index}
                onClick={() => {
                  setCurrentConvo(conversation)
                  setChatMessages(conversation.messages)
                }
                }>
                {otherUserName}</ConversationLink>;
            })}

          </SidebarBody>
        </ChatSidebar>
        <div>
          <ChatHeader>Direct Messages</ChatHeader>
          {currentConvo && (
            <ChatBody>
              {chatMessages.map((message: any, index: number) => {
                const sender = currentConvo.members.find((member: any) => member.id === message.senderId);
                const senderFirstName = sender ? sender.firstName : '';
                return (
                  <div key={index}>
                    <div>{senderFirstName} @ {message.createdAt}</div>
                    <div>{message.text}</div>
                  </div>
                );
              })}
            </ChatBody>
          )}
          <ChatFooter>
            <ChatInput
              type="text"
              placeholder="Type your message here..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <ChatButton onClick={handleSend}>Send</ChatButton>
          </ChatFooter>
        </div>
      </ChatWrapper>
    </ChatContainer>
  );

}

export default Chat;
