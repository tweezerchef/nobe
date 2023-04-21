import React, { useState } from 'react';
import axios from 'axios';

interface Club {
  name: string;
}

function CreateClub() {
  const [club, setClub] = useState<Club>({ name: '' });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setClub((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/create-club', club);
      console.log(response.data);

      // add code to redirect to the new club's discussion page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Create New Club</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={club.name}
          onChange={handleInputChange}
        />

        <button type="submit">Create Club</button>
      </form>
    </div>
  );
}

export default CreateClub;
