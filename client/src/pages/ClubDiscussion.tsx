import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
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
  console.log(discussions);

  useEffect(() => {
    async function fetchDiscussion() {
      try {
        const { data } = await axios.get(`/api/clubs/${id}/discussion`);
        setDiscussions(data);
      } catch (error) {
        console.error(error);
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
      {discussions?.map((discussion) => (
        // console.log(discussion),
        <div key={discussion.id}>
          <h2>{discussion.title}</h2>
          {discussion.Posts?.map((post) => (
            <div key={post.id}>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default ClubDiscussion;
