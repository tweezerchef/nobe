/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Typography } from '@mui/material';
import styled from 'styled-components';
import UserContext from '../../hooks/Context';

const validFiles = ['image/jpg', 'image/jpeg', 'image/png'];

const ProfileImage = styled.img({
  borderRadius: '50%',
  boxShadow: '0px 0px 5px 0px #c1c1c1',
  cursor: 'pointer',
  width: '100px',
  height: '100px',
});

function ProfilePhotoUpload(props: any) {
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [profileAvi, setProfileAvi] = useState('');
  const { setProfileImage } = props;
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  // const id = user?.id;
  const defaultPic = 'https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png';
  //   const handleUpload = (e: any) => {
  //     const photoFile = e.target.files[0];
  //     console.log('photoFile', photoFile, 11);
  //     console.log('event', e, 13);
  //   };
  const imageSetter = () => {
    if (selectedImage) {
      setProfileImage(selectedImage);
      //  setClubImage(URL.createObjectURL(selectedImage));
    }
  };

  useEffect(() => {
    if (user?.picture) {
      setProfileAvi(user.picture);
    } else {
      setProfileAvi(defaultPic);
    }
  }, [user?.picture]);

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

  // const handleUpload = () => {
  //   if (imageUrl) {
  //     const file = selectedImage;
  //     const fileName = file?.name;
  //     const params = {
  //       Bucket: S3_BUCKET,
  //       Key: fileName,
  //       Body: file,
  //       ACL: 'public-read',
  //     };
  //   }
  // };
  // { user?.picture === null ? (
  //   <ProfileImage
  //     alt="User Pic"
  //     src="https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png"
  //     id="profile-image1"
  //     height="250"
  //   />
  // )
  //   : (
  //     <ProfileImage
  //       alt="User Pic"
  //       src={user?.picture}
  //       id="profile-image1"
  //       height="250"
  //     />
  // ); }
  return (
    <Box>
      <div>
        { imageUrl && selectedImage ? (
          <ProfileImage
            alt="User Pic"
            src={imageUrl}
            id="profile-image1"
            height="250"
          />
        )
          : (
            <ProfileImage
              alt="User Pic"
              src={profileAvi}
              id="profile-image1"
              height="250"
            />
          )}
      </div>
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
    </Box>
  );
}

export default ProfilePhotoUpload;
