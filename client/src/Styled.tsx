import styled from 'styled-components';

export const ChatContainer = styled.div`
  position: relative;
  width: 450px;
  height: 400px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const ChatWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
`;

export const ChatSidebar = styled.div`
  width: 200px;
  height: 100%;
  background-color: #f0f0f0;
  border-right: 1px solid #ccc;
`;

export const SidebarHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #f0f0f0;
  font-weight: bold;
  font-size: 20px;
`;

export const SidebarBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;

  .search-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }

  .search-bar input[type="text"] {
    border: none;
    width: 80%;
    border-bottom: 1px solid gray;
    font-size: 16px;
    padding: 8px;
    margin-right: 8px;
  }

  .search-bar button {
    border: none;
    width: 20%;
    background-color: #0084ff;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    padding: 10px;
  }

  .search-bar input[type="text"]:focus,
  .search-bar button:focus {
    outline: none;
  }

  .ConversationLink:active {
    background-color: #ccc;
  }
`;

export const ConversationLink = styled.a`
  display: block;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

export const ChatHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #f0f0f0;
  font-weight: bold;
  font-size: 20px;
  flex: 3;
`;

export const ChatBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  overflow-y: auto;
  padding: 10px;
  height: calc(100% - 150px);
`;

export const ChatFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: #f0f0f0;
  padding: 10px;
  position: absolute;
  bottom: 0;
`;

export const ChatInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 10px;
`;

export const ChatButton = styled.button`
  background-color: #0084ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
`;