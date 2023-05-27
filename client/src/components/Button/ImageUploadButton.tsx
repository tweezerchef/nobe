/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';

const validFiles = ['image/jpg', 'image/jpeg', 'image/png'];

function PhotoUpload(props: any) {
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { setClubImage } = props;

  const imageSetter = () => {
    if (selectedImage) {
      setClubImage(selectedImage);
    }
  };

  useEffect(() => {
    if (selectedImage) {
      if (!validFiles.find((type) => type === selectedImage.type)) {
        setError('File must be in JPEG/JNP format');
        return;
      }
      setImageUrl(URL.createObjectURL(selectedImage));
      imageSetter();
    }
  }, [selectedImage]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
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
          <img src={imageUrl} alt={selectedImage.name} height="200px" />
        </Box>
        )}
      </>
    </Box>
  );
}

export default PhotoUpload;
