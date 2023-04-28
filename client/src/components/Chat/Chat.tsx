import React, { useState } from 'react';
import { ChatContainer, ChatHeader, ChatBody, ChatFooter, ChatInput, ChatButton } from '../../Styled';
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

  return (
    <ChatContainer>
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
    </ChatContainer>
  );
}

export default Chat;
