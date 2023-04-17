const path = require('path');
const express = require('express');
require('dotenv').config();


const app = express();
const CLIENT_PATH = path.resolve(__dirname, '../client/build');
app.use(express.static(CLIENT_PATH));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server listening on :${PORT}`);
  });
