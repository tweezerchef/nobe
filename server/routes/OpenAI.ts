import express, { Request, Response } from 'express';
import axios from 'axios';

const { PrismaClient } = require('@prisma/client');

const dotenv = require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});

const OpenAI = express.Router();
const OpenApi = new OpenAIApi(configuration);

const prisma = new PrismaClient();

OpenAI.get('/', async (req, res) => {
  try {
    const response = await OpenApi.createCompletion({
      model: 'text-davinci-003',
      prompt: req.query.content,
      max_tokens: 1000,
    });
    console.log(response.data);
    res.status(200).send(response.data.choices[0].text);
  } catch (error) {
    console.error('didnt work', error);
    res.sendStatus(500);
  }
});

export default OpenAI;
