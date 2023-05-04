
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import { Server } from "socket.io";
//Socket.Io

const io = new Server({
  cors: {
    origin: "http://localhost:8080"
  }
});

interface User {
  firstName: string;
  socketId: string;
  id: string
}

let onlineUsers: User[] = [];


io.on("connection", (socket) => {
  console.log('someone has connected!')
  io.emit("test", 'this is test')
  // socket.on("newUser", (user)=> {
  //   addNewUser(user.firstName, socket.id, user.id);
  // })

  socket.on('new-message', (data) => {
    console.log('New message:', data);
    io.emit('new-message', data);
  });

  socket.on('new-follow', (data) => {
    console.log('newFollower:', data);
    io.emit('new-follower', data)
  })

  socket.on('disconnect', () => {
    console.log('someone has disconnected');
    // removeUser(socket.id);
  });
});

io.listen(3000);

//Routes
import UserBooks from './routes/userbooks';
import LocationRoute from './routes/booksnearuser';
import Clubs from './routes/clubs';
import CreateClub from './routes/createClub';
import Trending from './routes/trending';
import Recommendations from './routes/recommendations';
import Review from './routes/review';
import Wishlist from './routes/wishlist';
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



dotenv.config();
const app = express();
const CLIENT_PATH = path.resolve(__dirname, '../client/build');
const PORT = 8080;
const prisma = new PrismaClient();

//Middleware
app.use(express.static(CLIENT_PATH));

const allowedOrigins = ['http://ec2-3-19-30-206.us-east-2.compute.amazonaws.com:8080', 'http://localhost:8080', '/'];

app.use(cors({
  origin: allowedOrigins,
}));
//app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




//routes
app.use("/location", LocationRoute);
app.use("/recommendations", Recommendations);
app.use("/user-books", UserBooks);
app.use('/review', Review);
// app.use("/clubs", Clubs);
app.use("/api/clubs", Clubs);
app.use('/api/create-club', CreateClub);
app.use("/api/trending", Trending);
app.use("/api/wishlist", Wishlist);
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

//make sure this is the last route in our server
app.get('*', (req, res) => {
  res.sendFile(path.resolve('./client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on :${PORT}`);
});
