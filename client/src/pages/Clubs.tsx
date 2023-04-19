import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Club {
  id: string;
  name: string;
}

function Clubs() {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    async function fetchClubs() {
      const response = await axios.get("/api/clubs");

      setClubs(response.data);
    }
    fetchClubs();
  }, []);

  return (
    <div>
      <h1>Book Clubs</h1>
      <ul>
        {clubs.map((club) => (
          <li >
            {club.name}
          </li>
          // <li key={club.id}>
          //   <Link to={`/api/clubs/${club.id}`}>{club.name}</Link>
          // </li>
        ))}
      </ul>
    </div>
  )
}

export default Clubs;
