import React, { useState } from 'react';
import { ChatContainer, ChatHeader, ChatBody, ChatFooter, ChatInput, ChatButton } from '../../Styled';


type ChatProps = {
  messages: string[];
  onSend: (message: string) => void;
};

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
      <ChatHeader>React Js Chat Application</ChatHeader>
      <ChatBody>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
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
