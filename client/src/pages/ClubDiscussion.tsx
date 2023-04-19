import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

interface Discussion {
  id: string;
  name: string;
  text: string;
}

function ClubDiscussion() {
  const { id } = useParams<{ id: string }>();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);

  useEffect(() => {
    async function fetchDiscussion() {
      const response = await axios.get(`/api/clubs/${id}/discussion`);
      setDiscussions(response.data);
    }
    fetchDiscussion();
  }, [id])


  return (
    <div>
      <h1>Book Club Discussion</h1>
      <ul>
        {discussions.map((discussion) => (
          <li key={discussion.id}>{discussion.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default ClubDiscussion;
