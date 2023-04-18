const path = require('path');
const express = require('express');
require('dotenv').config();
const UserBooks = require('./routes/userbooks.ts');

const app = express();
const CLIENT_PATH = path.resolve(__dirname, '../client/build');
app.use(express.static(CLIENT_PATH));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// //make sure this is the last route in our server
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve('./client/build', 'index.html'));
// });
const PORT = 8080;

app.use("/books", UserBooks);

//make sure this is the last route in our server
app.get('*', (req, res) => {
  res.sendFile(path.resolve('./client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on :${PORT}`);
});
