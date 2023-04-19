
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import UserBooks from './routes/userbooks';
import Trending from './routes/Trending';

dotenv.config();


const app = express();
const CLIENT_PATH = path.resolve(__dirname, '../client/build');

app.use(morgan('combined'));
app.use(express.static(CLIENT_PATH));
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



const PORT = 8080;

app.use("/books", UserBooks);
app.use("/api/trending", Trending);

//make sure this is the last route in our server
app.get('*', (req, res) => {
  res.sendFile(path.resolve('./client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on :${PORT}`);
});
