import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import axios from "axios";

interface DiscussionPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

interface Discussion {
  id: string;
  posts: DiscussionPost[];
};

function ClubDiscussion() {
  const { id } = useParams<{ id: string }>();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [hasJoined, setHasJoined] = useState(false);
  // console.log(discussions);

  useEffect(() => {
    async function fetchDiscussion() {
      try {
        const response = await axios.get(`/api/clubs/${id}/discussion`);
        setDiscussions(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDiscussion();
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
    </div>
  )
}

export default ClubDiscussion;
