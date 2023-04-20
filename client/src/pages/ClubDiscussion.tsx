import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import axios from "axios";

interface Discussion {
  id: string;
  name: string;
  text: string;
}

function ClubDiscussion() {
  const { id } = useParams<{ id: string }>();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    async function fetchDiscussion() {
      const response = await axios.get(`/api/clubs/${id}/discussion`);
      setDiscussions(response.data);
    }
    fetchDiscussion();
  }, [id])

  const handleJoinClub = async () => {
    try {
      const email = localStorage.getItem("user");
      await axios.post(`/api/clubs/${id}/join`, { email });
      setHasJoined(true);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <h1>Book Club Discussion</h1>
      <Button
        variant="contained"
        color="primary"
        disabled={hasJoined}
        onClick={handleJoinClub}
      >
        {hasJoined ? "Joined" : "Join"}
      </Button>
      <ul>
        {discussions.map((discussion) => (
          <li key={discussion.id}>{discussion.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default ClubDiscussion;
