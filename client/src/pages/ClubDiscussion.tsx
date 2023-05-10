import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button, TextField, FormControl,
} from '@material-ui/core';
import {
  Stack, Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';

import axios from 'axios';
import { ClubHeader } from './style';
import JoinClubButton from '../components/Button/JoinClubButton';
import '../styles/clubDiscussionStyle.css';
import DiscussionList from '../components/DiscussionForum/Discussions';
import UserContext from '../hooks/Context';
import { Discussion } from '../typings/types';

function ClubDiscussion() {
  const { id } = useParams<{ id: string }>();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [newDiscussionTitle, setNewDiscussionTitle] = useState('');
  const [showForm, setShowForm] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const clubName = searchParams.get('name');
  const clubId = id;

  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const userId = user?.id;

  useEffect(() => {
    async function fetchDiscussion() {
      try {
        const { data } = await axios.get(`/api/clubs/${id}/discussion`);
        setDiscussions(data);
      } catch (error) {
        console.error(error);
      }
    }
    if (id) {
      fetchDiscussion();
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // const user = localStorage.getItem('user');

      if (!user) {
        throw new Error('No user found');
      }
      if (!newDiscussionTitle) {
        alert('Please enter a discussion title');
        return;
      }
      // const parsed = JSON.parse(user);
      const response = await axios.post(`/api/clubs/${id}/discussion`, {
        title: newDiscussionTitle,
        userId,
      });
      setDiscussions((discussions) => [...discussions, response.data]);
      setNewDiscussionTitle('');
      setShowForm(false);
    } catch (error) {
      console.error(error);
    } finally { console.log(discussions); }
  };

  return (
    <div>
      <ClubHeader style={{ textAlign: 'center' }}>{clubName}</ClubHeader>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Stack spacing={2} direction="row">
          <JoinClubButton clubId={clubId} />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowForm(!showForm)}
          >
            Create a Thread
          </Button>
        </Stack>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <FormControl>
            <TextField
              label="Thread Title"
              variant="outlined"
              name="title"
              value={newDiscussionTitle}
              onChange={(event) => setNewDiscussionTitle(event.target.value)}
            />
            <Button type="submit" variant="contained">Create</Button>
          </FormControl>
        </form>
      )}
      {id && <DiscussionList discussions={discussions} clubId={id} key={discussions.length} />}
    </div>
  );
}

export default ClubDiscussion;
