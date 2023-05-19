import { createContext, useContext } from 'react';

export interface User {
  id: string;
  firstName: string;
  picture: string;
}

export interface ChatContextType {
  chatState: boolean;
  setChatState: React.Dispatch<React.SetStateAction<boolean>>;
  chatUser: User;
  setChatUser: React.Dispatch<React.SetStateAction<User>>;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const useChatContext = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatContextProvider');
  }
  return context;
};

export default ChatContext;
