import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";



function Locations() {



  return (
    <div>
      <h1>Near Me</h1>
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

export default Locations;