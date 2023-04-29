import React, { useState, useEffect, useRef, useContext } from 'react';
import { ChatContainer, ChatHeader, ChatBody, ChatFooter, ChatInput, ChatButton, ChatSidebar, SidebarHeader, SidebarBody, ConversationLink, ChatWrapper } from '../../Styled';
import UserContext from '../../hooks/Context';
import axios from 'axios';

interface Message {
  text: string;
  name: string;
  sender: string;
}

interface ChatProps {
  messages: Message[];
  onSend: (message: string) => void;
}

function Chat({ messages, onSend }: ChatProps) {
  const [message, setMessage] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const id = user.id

  const handleSend = (): void => {
    if (message.trim() !== '') {
      onSend(message);
      setMessage('');
    }
  };



  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('/conversations', {
        currentUser: id,
        otherUser: searchQuery
      });
      const newConversation = response.data;
    } catch (error) {
      console.error(error);
    }
    setSearchQuery('')
  };

  const conversations = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];

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
            {conversations.map((conversation, index) => (
              <ConversationLink key={index}>{conversation.name}</ConversationLink>
            ))}
          </SidebarBody>
        </ChatSidebar>
        <div>
          <ChatHeader>Direct Messages</ChatHeader>
          <ChatBody>
            {messages.map((message: Message, index: number) => (
              <div>
                <div key={index}>{message.name} @ time</div>
                <div>{message.text}</div>
              </div>
            ))}
          </ChatBody>
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
