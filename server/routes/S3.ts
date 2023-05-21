import express, { Request, Response } from 'express';
import multer, { File } from 'multer';
import aws from 'aws-sdk';
import fs from 'fs';

interface MulterRequest extends Request {
  file: File;
}
const upload = multer({ dest: 'uploads/' });
const Amazon = express.Router();

aws.config.update({
  accessKeyId: 'AKIAYGT7FTGUWZTSAKPM',
  secretAccessKey: '6JNp60igjfvfrB1SU+9n7okDmtSMPV79sRGTQ2UM',
  region: 'US East (N. Virginia) us-east-1', // your region
});

Amazon.put('/club', upload.single('image'), (req, res) => {
  const file = req?.file;
  if (!file) {
    res.status(400).json({ error: true, Message: 'No file uploaded' });
    return;
  }

  const s3FileURL = `https://yourBucket.s3.amazonaws.com/${file.originalname}`;

  const s3bucket = new aws.S3({
    accessKeyId: 'AKIAYGT7FTGUWZTSAKPM',
    secretAccessKey: '6JNp60igjfvfrB1SU+9n7okDmtSMPV79sRGTQ2UM',
    Bucket: 'nobe-bucket',
  });

  const params: aws.S3.PutObjectRequest = {
    Bucket: 'nobe-bucket',
    Key: file?.originalname,
    Body: fs.createReadStream(file.path),
    ContentType: file?.mimetype,
    ACL: 'public-read', // make sure to set the proper permissions
  };

  s3bucket.upload(params, (err: Error, data: aws.S3.ManagedUpload.SendData) => {
    fs.unlinkSync(file?.path); // Empty temp directory. delete file after upload
    if (err) {
      res.status(500).send({ error: true, Message: err });
    } else {
      res.send({ data });
      const newFileUploaded = {
        description: req.body.description,
        fileLink: s3FileURL,
        s3_key: params.Key,
      };
      // Save the file name into database
      // yourDatabaseModel.create(newFileUploaded, (err, data) => {
      //   if (err) {
      //     throw err;
      //   }
      // });
    }
  });
});

export default Amazon;
