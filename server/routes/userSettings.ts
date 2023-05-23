/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import multer from 'multer';
import aws from 'aws-sdk';
import fs from 'fs';

const upload = multer({ dest: 'uploads/' });
const prisma = new PrismaClient();
const UserSettings = express.Router();

aws.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'us-east-1',
});

const uploadToS3 = (file: Express.Multer.File): Promise<string> => {
  const s3FileURL = `https://nobe-bucket.s3.amazonaws.com/${file.originalname}`;

  const s3bucket = new aws.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  });

  const params: aws.S3.PutObjectRequest = {
    Bucket: 'arn:aws:s3:us-east-1:563981162921:accesspoint/nobe',
    Key: file.originalname,
    Body: fs.createReadStream(file.path),
    ContentType: file.mimetype,
  };

  return new Promise((resolve, reject) => {
    s3bucket.upload(params, (err: Error, data: aws.S3.ManagedUpload.SendData) => {
      fs.unlinkSync(file.path);
      if (err) {
        reject(err);
      } else {
        resolve(s3FileURL);
      }
    });
  });
};

UserSettings.put('/:id/preferences', async (req, res) => {
  console.log(req, 273);
  const { id } = req.params;
  // const {
  //   username, firstName, lastName, phoneNumber, longitude,
  //   latitude,
  //   radius,
  // } = req.body;
  // const radNum = Number(radius);
  // try {
  //   const userUpdatePreferences = await prisma.user.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       picture,
  //       username,
  //       firstName,
  //       lastName,
  //       phoneNumber,
  //       longitude,
  //       latitude,
  //       radius: radNum,
  //     },
  //   });
  //   // console.log(userUpdatePreferences, 295);
  //   res.status(200).json({ userUpdatePreferences });
  // } catch (e) {
  //   console.error(e);
  //   res.status(500).json({
  //     error: 'Server error!',
  //   });
  // }
});

UserSettings.put('/:id/genres', async (req, res) => {
  // console.log(req, 273);
  const { id } = req.params;
  const { genres } = req.body;
  try {
    const userUpdateGenres = await prisma.user.update({
      where: {
        id,
      },
      data: {
        UserGenre: genres,
      },
    });
    // console.log(userUpdatePreferences, 295);
    res.status(200).json({ userUpdateGenres });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: 'Server error!',
    });
  }
});

UserSettings.put('/:id/hobbies', async (req, res) => {
  // console.log(req, 273);
  const { id } = req.params;
  const { hobbies } = req.body;
  try {
    const userUpdateHobbies = await prisma.user.update({
      where: {
        id,
      },
      data: {
        UserHobbies: hobbies,
      },
    });
    // console.log(userUpdatePreferences, 295);
    res.status(200).json({ userUpdateHobbies });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: 'Server error!',
    });
  }
});

export default UserSettings;
