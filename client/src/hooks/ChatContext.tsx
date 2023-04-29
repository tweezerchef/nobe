import { createContext } from 'react';

export interface ChatContextType {
  messages: any[];
  setMessages: (messages: any[]) => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export default ChatContext;
