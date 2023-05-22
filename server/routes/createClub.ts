import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import multer from 'multer';
import aws from 'aws-sdk';
import fs from 'fs';

const upload = multer({ dest: 'uploads/' });
const prisma = new PrismaClient();
const CreateClubRoute = express.Router();

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

async function findOrCreateClub(
  name: string,
  description: string,
  image: string,
  userId: string,
) {
  const newClub = await prisma.clubs.upsert({
    where: { name },
    update: {},
    create: {
      name, description, image, clubMembers: { create: { userId } },
    },
    include: { clubMembers: true },
  });
  return newClub;
}

CreateClubRoute.post('/', upload.single('image'), async (req: Request, res: Response) => {
  const createdBy = req.body.email;
  const { userId, name, description } = req.body;

  const { file } = req;
  if (!file) {
    res.status(400).json({ error: true, Message: 'No file uploaded' });
    return;
  }

  try {
    const image = await uploadToS3(file);
    console.log('s3FileURL: ', image);

    findOrCreateClub(name, description, image, userId)
      .then(async () => {
        try {
          // const s3Response = await axios.put('http://localhost:8080/amazon/club', {
          //   image,
          // });
          // console.log('s3Response', s3Response.data);
          const clubs = await prisma.clubs.findMany({
            include: {
              clubMembers: true,
            },
          });
          const userData = await axios.get(`http://localhost:8080/user?email=${createdBy}`);
          const user = userData.data;
          const response = { clubs, user };
          res.send(response);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Something went wrong' });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default CreateClubRoute;
