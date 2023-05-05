/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-console */
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import { Server, ServerOptions } from "socket.io";
import UserBooks from './routes/userbooks';
import LocationRoute from './routes/booksnearuser';
import Clubs from './routes/clubs';
import CreateClub from './routes/createClub';
import Trending from './routes/trending';
import Recommendations from './routes/recommendations';
import Review from './routes/review';
// import Wishlist from './routes/wishlist';
import OpenAI from './routes/OpenAI';
import BookData from './routes/BookData';
import User from './routes/User';
import GoogleBooks from './routes/GoogleBooks';
import SpotsMapRoute from './routes/spotsmap';
import Auth from './routes/authorization';

import Friendship from './routes/friendship';
import Activity from './routes/activity';
import DirectMessages from './routes/directMessages';
import Conversations from './routes/conversations';
import Notifications from './routes/notifications';

// Routes
dotenv.config();
const app = express();
const CLIENT_PATH = path.resolve(__dirname, '../client/build');
const PORT = 8080;
const prisma = new PrismaClient();

// Middleware
app.use(express.static(CLIENT_PATH));

// app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use("/location", LocationRoute);
app.use("/recommendations", Recommendations);
app.use("/user-books", UserBooks);
app.use('/review', Review);
// app.use("/clubs", Clubs);
app.use("/notifications", Notifications);
app.use("/api/clubs", Clubs);
app.use('/api/create-club', CreateClub);
app.use("/api/trending", Trending);
// app.use("/api/wishlist", Wishlist);
app.use("/openai", OpenAI);
app.use("/bookdata", BookData);
app.use("/user", User);
app.use("/google-books", GoogleBooks);
app.use("/api/places-to-read", SpotsMapRoute);
app.use("/api/friendship", Friendship);
app.use("/api/activity", Activity);
app.use("/direct-messages", DirectMessages);
app.use("/conversations", Conversations);
app.use("/auth", Auth);

// Socket.Io

interface CustomServerOptions extends ServerOptions {
  generateId: (req: any) => any;
}

const io = new Server({
  cors: {
    origin: process.env.SERVER_URL,
  },
  // eslint-disable-next-line no-underscore-dangle
  generateId: (req) => req._query.userId,
} as CustomServerOptions);

const allowedOrigins = ['http://ec2-18-221-114-235.us-east-2.compute.amazonaws.com:8080', 'http://localhost:8080', '/'];

app.use(cors({
  origin: allowedOrigins,
}));

// eslint-disable-next-line @typescript-eslint/no-redeclare
interface User {
  socketId: string;
  id: string
}

// let onlineUsers: User[] = [];
// const addNewUser = (id: string, socketId: any) => {
//   !onlineUsers.some((user) => user.id === id)
//   && onlineUsers.push({
//     id, socketId,
//   });
// };

// socket.on("newUser", (id) => {
//   addNewUser(id, socket.id);
// });
// removeUser(socket.id);

// const removeUser = (socketId: string) => {
//   onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
// };

// const getUser = (id: string) => {
//   onlineUsers.find((user) => user.id === id);
// };

io.on("connection", (socket) => {
  console.log('someone has connected!');
  io.emit("test", 'this is test');

  socket.on('new-message', (data) => {
    console.log('New message:', data);
    io.emit('new-message', data);
  });

  socket.on('new-follow', (data) => {
    console.log('newFollower:', data);
    io.emit('new-follower', data);
  });

  socket.on('disconnect', () => {
    console.log('someone has disconnected');
  });
});

io.listen(3000);

// make sure this is the last route in our server
app.get('*', (req, res) => {
  res.sendFile(path.resolve('./client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on :${PORT}`);
});
