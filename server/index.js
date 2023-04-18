const path = require('path');
const express = require('express');
require('dotenv').config();
const axios = require('axios')
const { PrismaClient } = require('@prisma/client');
const ClubsRoute = require('./routes/clubs.ts');
const UserBooks = require('./routes/userbooks.ts');

const prisma = new PrismaClient();
const app = express();
const CLIENT_PATH = path.resolve(__dirname, '../client/build');
app.use(express.static(CLIENT_PATH));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/clubs", ClubsRoute({ express, axios, PrismaClient, prisma }));
app.use("/books", UserBooks({ express, axios, PrismaClient, prisma }));

//make sure this is the last route in our server
app.get('*', (req, res) => {
  res.sendFile(path.resolve('./client/build', 'index.html'));
});
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server listening on :${PORT}`);
});
