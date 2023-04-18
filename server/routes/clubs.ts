// const express = require('express');
// const axios = require('axios')
// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();
// const ClubsRoute = express.Router();

const ClubsRoute = ({ express, axios, prisma }) => {
  const router = express.Router();

  router.get('/api/clubs', async (req, res) => {
    try {
      const clubs = await prisma.clubs.findMany();
      res.json(clubs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  return router;
}

module.exports = ClubsRoute;