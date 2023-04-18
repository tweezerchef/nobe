const express = require('express');
const axios = require('axios')
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const ClubsRoute = express.Router();

module.exports = ClubsRoute;