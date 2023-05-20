import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button, TextField, FormControl,
} from '@material-ui/core';
import {
  Stack, Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';

import axios from 'axios';
import { ClubHeader, ClubDescription } from './style';
import JoinClubButton from '../components/Button/JoinClubButton';
import '../styles/clubDiscussionStyle.css';
import DiscussionList from '../components/DiscussionForum/Discussions';
import UserContext from '../hooks/Context';
import { Discussion } from '../typings/types';

interface Club {
  clubId: string;
  name: string;
  description: string;
  image: string;
  clubMembers: string[];
}

function ClubDiscussion() {
  const [thisClub, setClub] = useState<Club[]>([]);
  const { id } = useParams<{ id: string }>();
  const [discussionList, setDiscussionList] = useState<Discussion[]>([]);
  const [newDiscussionTitle, setNewDiscussionTitle] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const clubName = searchParams.get('name');
  const clubId = id;

  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const userId = user?.id;

  const member = user?.clubMembers?.reduce((acc: boolean, club: Club) => {
    if (club.clubId === clubId) {
      acc = true;
      return acc;
    }
    return acc;
  }, false);

  async function fetchClubs() {
    const response = await axios.get(`/api/clubs/${clubId}`);
    setClub(response.data);
  }

  useEffect(() => {
    async function fetchDiscussion() {
      try {
        const { data } = await axios.get(`/api/clubs/${clubId}/discussion`);
        setDiscussionList(data);
      } catch (error) {
        console.error(error);
      }
    }
    if (id) {
      fetchDiscussion();
      fetchClubs();
    }
  }, []);

  const handleSubmit = async () => {
    try {
      if (!user) {
        throw new Error('No user found');
      }
      if (!newDiscussionTitle) {
        alert('Please enter a discussion title');
        return;
      }
      if (!member) {
        alert('Not a member of this club');
        return;
      }
      const response = await axios.post(`/api/clubs/${clubId}/discussion`, {
        title: newDiscussionTitle,
        userId,
      });
      setDiscussionList((discussions) => [...discussions, response.data]);
      setNewDiscussionTitle('');
      setDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ClubHeader style={{ textAlign: 'center' }}>{clubName}</ClubHeader>
      <ClubDescription style={{ textAlign: 'center' }}>{thisClub[0]?.description}</ClubDescription>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Stack spacing={2} direction="row">
          <JoinClubButton clubId={clubId} member={member} />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setDialogOpen(!dialogOpen)}
            disabled={!member}
          >
            Create a Thread
          </Button>
        </Stack>
      </div>
      {dialogOpen && (
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle>Create a Thread</DialogTitle>
        <DialogContent>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <FormControl>
              <TextField
                autoFocus
                margin="dense"
                label="Thread Title"
                fullWidth
                variant="outlined"
                name="title"
                value={newDiscussionTitle}
                onChange={(event) => setNewDiscussionTitle(event.target.value)}
              />
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      )}
      {clubId && (
      <DiscussionList
        discussions={discussionList}
        clubId={clubId}
        key={discussionList.length}
      />
      )}
    </div>
  );
}

export default ClubDiscussion;
