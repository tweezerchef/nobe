const { PrismaClient } = require('@prisma/client');
import express, { Request, Response } from 'express';
import axios from 'axios';
const dotenv = require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
  });

const OpenAI = express.Router();
const OpenApi = new OpenAIApi(configuration);


const prisma = new PrismaClient();

OpenAI.get('/', (req, res) => {
return OpenApi.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{role: 'user', content: req.query.content}],
  })
    .then((response: any)=>{
      console.log(response);
        //console.log(response.data.choices[0].message);
      //res.send(response.data.choices[0].message).status(200);
    })
    .catch((error: any)=>{
      res.status(500);
      console.error('didnt work', error);
    });
});







export default OpenAI