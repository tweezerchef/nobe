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

UserSettings.put('/:id/preferences', upload.single('image'), async (req: Request, res: Response) => {
  // console.log(req, 48);
  const { id } = req.params;
  const { file } = req;

  const {
    username, firstName, lastName, phoneNumber, longitude,
    latitude, radius,
  } = req.body;

  const lonNum = Number(longitude);
  const latNum = Number(latitude);
  const radNum = Number(radius);

  let picture: string | undefined;
  if (file) {
    picture = await uploadToS3(file);
  }

  try {
    const updateData: any = {};

    if (picture) {
      updateData.picture = picture;
    }
    if (username) {
      updateData.username = username;
    }
    if (firstName) {
      updateData.firstName = firstName;
    }
    if (lastName) {
      updateData.lastName = lastName;
    }
    if (phoneNumber) {
      updateData.phoneNumber = phoneNumber;
    }
    if (longitude) {
      updateData.longitude = lonNum;
    }
    if (latitude) {
      updateData.latitude = latNum;
    }
    if (radius) {
      updateData.radius = radNum;
    }

    const userUpdatePreferences = await prisma.user.update({
      where: {
        id,
      },
      data: updateData,
    });
    res.status(200).send(userUpdatePreferences);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: 'Server error!',
    });
  }
});

UserSettings.put('/:id/genres', async (req, res) => {
//  console.log(req, 83);
  const { id } = req.params;
  const { checkedGenres }: { checkedGenres: string[] } = req.body;

  try {
    const userUpdateGenres = await prisma.user.update({
      where: {
        id,
      },
      data: {
        UserGenre: {
          deleteMany: {},
          create: checkedGenres.map((genre) => ({ genre })),
        },
      },
    });
    // console.log(userUpdateGenres, 108);
    res.status(200).json({ userUpdateGenres });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: 'Server error!',
    });
  }
});

UserSettings.get('/:id/genres', async (req, res) => {
// console.log(req, 106);
  const { id } = req.params;
  try {
    const userGetGenres = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        UserGenre: {
          select: {
            genre: true,
          },
        },
      },
    });
      //  console.log(userGetGenres, 134);
    res.status(200).send(userGetGenres);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: 'Server error!',
    });
  }
});

UserSettings.put('/:id/hobbies', async (req, res) => {
  // console.log(req, 106);
  const { id } = req.params;
  const { checkedHobbies }: { checkedHobbies: string[] } = req.body;

  try {
    const userUpdateHobbies = await prisma.user.update({
      where: {
        id,
      },
      data: {
        UserHobbies: {
          deleteMany: {},
          create: checkedHobbies.map((hobbies) => ({ hobbies })),
        },
      },
    });
    // console.log(userUpdateHobbies, 161);
    res.status(200).json({ userUpdateHobbies });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: 'Server error!',
    });
  }
});

UserSettings.get('/:id/hobbies', async (req, res) => {
  // console.log(req, 106);
  const { id } = req.params;
  try {
    const userGetHobbies = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        UserHobbies: {
          select: {
            hobbies: true,
          },
        },
      },
    });
    // console.log(userGetHobbies, 187);
    res.status(200).send(userGetHobbies);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: 'Server error!',
    });
  }
});

export default UserSettings;
