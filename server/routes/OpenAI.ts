/* eslint-disable no-plusplus */
import express from 'express';

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});

const OpenAI = express.Router();
const OpenApi = new OpenAIApi(configuration);

const MAX_RETRIES = 5;
const RETRY_DELAY = 15000;

OpenAI.get('/', async (req, res) => {
  let retries = 0;

  const makeRequest = async () => {
    try {
      const response = await OpenApi.createCompletion({
        model: 'text-davinci-003',
        prompt: req.query.content,
        max_tokens: 1000,
      });
      console.log(response.data);
      res.status(200).send(response.data.choices[0].text);
    } catch (error) {
      console.error('Error:', error);
      if (retries < MAX_RETRIES) {
        retries++;
        console.warn(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
        setTimeout(makeRequest, RETRY_DELAY);
      } else {
        console.error(`Max retries (${MAX_RETRIES}) exceeded`);
        res.sendStatus(500);
      }
    }
  };

  makeRequest();
});

export default OpenAI;
