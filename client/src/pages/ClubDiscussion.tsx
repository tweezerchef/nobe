import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import {
  Button, Card, CardContent, Typography, TextField, FormControl,
} from '@material-ui/core';
import axios from 'axios';
// import UserContext from '../hooks/Context';
import { ClubHeader } from './style';
import JoinClubButton from '../components/Button/JoinClubButton';

interface DiscussionPost {
  id: string;
  body: string;
  userId: string;
  discussionId: string;
}

interface Discussion {
  id: string;
  Posts: DiscussionPost[];
  title: string;
}

function ClubDiscussion() {
  const { id } = useParams<{ id: string }>();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const searchParams = new URLSearchParams(location.search);
  const clubName = searchParams.get('name') || 'Book Club Discussion';
  const [newDiscussionTitle, setNewDiscussionTitle] = useState('');
  const [showForm, setShowForm] = useState(false);

  const clubId = id;
  // const userContext = useContext(UserContext);
  // const user = userContext?.user;
  // console.log(user);

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
      const user = localStorage.getItem('user');

      if (!user) {
        throw new Error('No user found');
      }
      if (!newDiscussionTitle) {
        alert('Please enter a title');
        return;
      }
      const parsed = JSON.parse(user);
      const response = await axios.post(`/api/clubs/${id}/discussion`, {
        title: newDiscussionTitle,
        userId: parsed.id,
      });
      setDiscussions([...discussions, response.data]);
      setNewDiscussionTitle('');
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
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
            Start new discussion
          </Button>
        </Stack>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <FormControl>
            <TextField
              label="Discussion Title"
              variant="outlined"
              name="title"
              value={newDiscussionTitle}
              onChange={(event) => setNewDiscussionTitle(event.target.value)}
            />
            <Button type="submit" variant="contained">Start Discussion</Button>
          </FormControl>
        </form>
      )}
      {discussions?.map((discussion) => (
        <Card key={discussion.id}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center' }}>
              <Link
                to={`/clubs/${id}/discussion/${discussion.id}`}
                style={{ color: 'black', textDecoration: 'none' }}
              >
                {discussion.title}
              </Link>
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ClubDiscussion;
