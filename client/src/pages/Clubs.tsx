import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Clubs() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    async function fetchClubs() {
      const response = await fetch("/clubs");
      const data = await response.json();
      setClubs(data);
    }
    fetchClubs();
  }, []);

  return (
    <div>
      <h1>Book Clubs</h1>
      {/* <ul>
        {clubs.map((club) => (
          <li key={club.id}>
            <Link to={`/clubs/${club.id}`}>{club.name}</Link>
          </li>
        ))}
      </ul> */}
    </div>
  )
}

export default Clubs;
