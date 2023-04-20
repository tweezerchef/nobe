import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import axios from "axios";

interface Club {
  id: string;
  name: string;
}

function Clubs() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newClubName, setNewClubName] = useState('');

  useEffect(() => {
    async function fetchClubs() {
      const response = await axios.get("/api/clubs");

      setClubs(response.data);
    }
    fetchClubs();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewClubName(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/create-club', { name: newClubName });
      console.log(response.data);

      setClubs([...clubs, response.data]); // add the new club to the state variable

      setShowForm(false); // hide the form after submission
      setNewClubName(''); // reset the input box
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Book Clubs</h1>
      <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>
        Create a new club
      </Button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newClubName}
            onChange={handleInputChange}
          />
          <button type="submit">Create Club</button>
        </form>
      )}

      <ul>
        {clubs.map((club) => (
          <li key={club.id}>
            <Link to={`/api/clubs/${club.id}`}>{club.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Clubs;
