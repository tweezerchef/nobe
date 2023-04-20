import React from 'react';

function CreateClub() {
  return (
    <div>
      <h1>Create New Club</h1>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />

        <button type="submit">Create Club</button>
      </form>
    </div>
  );
}

export default CreateClub;
