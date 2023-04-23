import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Card, CardContent, Typography, TextField, FormControl, FormLabel } from "@material-ui/core";
import { ClubHeader } from './style'
import axios from "axios";

interface DiscussionPost {
  id: string;
  body: string;
  userId: string;
  discussionId: string;
};

interface Discussion {
  id: string;
  Posts: DiscussionPost[];
  title: string;
};

function ClubDiscussion() {
  const { id } = useParams<{ id: string }>();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [hasJoined, setHasJoined] = useState(false);
  const searchParams = new URLSearchParams(location.search);
  const clubName = searchParams.get('name') || 'Book Club Discussion';
  const [newDiscussionTitle, setNewDiscussionTitle] = useState('');
  const [showForm, setShowForm] = useState(false);


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
  }, [id]);

  const handleJoinClub = async () => {
    try {
      const user = localStorage.getItem("user");

      if (!user) {
        throw new Error("No user found");
      }
      const parsed = JSON.parse(user)
      const email = parsed.email

      const { data: club } = await axios.get(`/api/clubs/${id}`);
      const memberEmails = club.members?.map((member: { email: string; }) => member.email);

      if (memberEmails && memberEmails.includes(email)) {
        setHasJoined(true);
        return;
      }

      await axios.post(`/api/clubs/${id}/join`, { email });
      setHasJoined(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const user = localStorage.getItem("user");

      if (!user) {
        throw new Error("No user found");
      }
      const parsed = JSON.parse(user)
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
      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          color="primary"
          disabled={hasJoined}
          onClick={handleJoinClub}
        >
          {hasJoined ? "Joined" : "Join"}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowForm(!showForm)}
        >
          Start new discussion
        </Button>
      </Stack>
      {showForm && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <FormControl>
            <FormLabel htmlFor="title"></FormLabel>
            <TextField
              label="Discussion Title"
              variant="outlined"
              name="title"
              value={newDiscussionTitle}
              onChange={(event) => setNewDiscussionTitle(event.target.value)}
            />
            <button type="submit">Start Discussion</button>
          </FormControl>
        </form>
      )}
      {discussions?.map((discussion) => (
        <div key={discussion.id}>
          <ul key={discussion.title}>
            <Link to={`/clubs/${id}/discussion/${discussion.id}`}>{discussion.title}</Link>
          </ul>
        </div>
      ))}
    </div>

  )
}

export default ClubDiscussion;
