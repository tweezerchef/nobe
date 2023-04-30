import  React, { useState, useContext, useEffect } from 'react';
import { Counter } from './style'
import { io, Socket } from "socket.io-client";
interface BookIconProps {
  openIcon: JSX.Element;
  notificationCount: number;
}





const BookIcon: React.FC<BookIconProps> = ({ openIcon, notificationCount }) => {

  const [socket, setSocket] = useState<any>(null);


  return (
    <div className="BookIcon">
      { notificationCount === 0 ? null : (<Counter>{notificationCount}</Counter>)}
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        width="40" height="40"
        viewBox="0 0 50 50">
        <path fill="none" stroke="#000" strokeLinejoin="round" strokeWidth="2" d="M3,9v33c13,0,22,4,22,4s9-4,22-4V9"></path>
        <path fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="2" d="M25,42V9"></path>
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M25,9c0,0-8-4-18-4v33c10,0,18,4,18,4"></path>
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M25,42c0,0,8-4,18-4V5C33,5,25,9,25,9"></path>
      </svg>
    </div>
  );
}

export default BookIcon;