import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const SpotsMapRoute = express.Router();




export default SpotsMapRoute;