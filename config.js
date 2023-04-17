require('dotenv').config();

const { DATABASE_URL } = process.env
const { GOOGLE_CLIENT_ID } = process.env
const { GOOGLE_CLIENT_SECRET } = process.env
const { SESSION_SECRET } = process.env

module.exports = {
  DATABASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SESSION_SECRET
};
