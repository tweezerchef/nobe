const express = require('express');
const axios = require('axios')
const { PrismaClient } = require('@prisma/client');
import { Request, Response } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

const prisma = new PrismaClient();
const Notifications = express.Router();







export default Notifications;