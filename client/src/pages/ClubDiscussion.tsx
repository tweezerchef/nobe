import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import DiscussionPosts from "./DiscussionPosts";
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
      <h1>{clubName}</h1>
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
      {showForm && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newDiscussionTitle}
            onChange={(event) => setNewDiscussionTitle(event.target.value)}
          />
          <button type="submit">Start Discussion</button>
        </form>
      )}
      {discussions?.map((discussion) => (
        <div key={discussion.id}>
          <ul key={discussion.title}>
            <Link to={`/clubs/${id}/discussion/${discussion.id}`}>{discussion.title}</Link>
          </ul>
          {/* <h2>{discussion.title}</h2>
          {discussion.Posts?.map((post) => (
            <div key={post.id}>
              <p>{post.body}</p>
            </div>
          ))} */}
        </div>
      ))}
    </div>

  )
}

export default ClubDiscussion;
