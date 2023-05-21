/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AWS from 'aws-sdk';
// import { s3 } from '../../../../server/socket';

const validFiles = ['image/jpg', 'image/jpeg', 'image/png'];

const S3_BUCKET = 'nobe-bucket';
const REGION = 'US East (N. Virginia) us-east-1';

AWS.config.update({
  accessKeyId: 'AKIAYGT7FTGUWZTSAKPM',
  secretAccessKey: '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',
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

function PhotoUpload() {
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  //   const handleUpload = (e: any) => {
  //     const photoFile = e.target.files[0];
  //     console.log('photoFile', photoFile, 11);
  //     console.log('event', e, 13);
  //   };

  useEffect(() => {
    if (selectedImage) {
      if (!validFiles.find((type) => type === selectedImage.type)) {
        setError('File must be in JPEG/JNP format');
        return;
      }

      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const handleUpload = () => {
    if (imageUrl) {
      const file = selectedImage;
      const fileName = file?.name;
      const params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Body: file,
        ACL: 'public-read',
      };

    //   s3.upload(params, (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
    //     if (err) {
    //       console.error('Error uploading image: ', err);
    //     } else {
    //       console.log('Image uploaded successfully. URL: ', data.Location);
    //       // Perform any further actions after successful upload
    //     }
    //   });
    }
  };

  //   eslint-disable-next-line no-console
  console.log(selectedImage, 20);

  return (
    <Box>
      <>
        <label htmlFor="select-image">
          <input
            accept="image/*"
            type="file"
            id="select-image"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              setSelectedImage(file || null);
            }}
          />
          <Button variant="contained" color="primary" component="span">
            Upload Image
          </Button>
          {error && (
            <Typography fontSize="lg" color="secondary">
                {error}
            </Typography>
          )}
        </label>
        {imageUrl && selectedImage && (
        <Box mt={2} textAlign="center">
          <div>Image Preview:</div>
          <img src={imageUrl} alt={selectedImage.name} height="100px" />
        </Box>
        )}
      </>
    </Box>

  // <Box>
  //   <label htmlFor="imageInput">
  //     <Input
  //       id="imageInput"
  //       type="file"
  //       hidden
  //       onChange={handleUpload}
  //     />
  //     {/* <input
  //     accept="image/"
  //     type="file"
  //     id="select-image"
  //     hidden
  //     onChange={handleUpload}
  //   /> */}
  //     <Button
  //       variant="contained"
  //       color="primary"
  //     >
  //       Upload Image
  //     </Button>
  //   </label>
  // </Box>
  );
}

export default PhotoUpload;
