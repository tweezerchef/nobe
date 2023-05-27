/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import ImgButton from './style';

const validFiles = ['image/jpg', 'image/jpeg', 'image/png'];

function ImageButton(props: any) {
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { onImageUpload } = props;

  const imageSetter = () => {
    if (selectedImage) {
      onImageUpload(selectedImage);
      //  setClubImage(URL.createObjectURL(selectedImage));
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
          <ImgButton>
            <ImageIcon style={{ cursor: 'pointer', fontSize: '28px', marginRight: '20px' }} />
          </ImgButton>
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
  );
}

export default ImageButton;
