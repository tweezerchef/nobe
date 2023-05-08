import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import BookDisplay from '../components/BookDisplay/BookDisplay';
import UserContext from '../hooks/Context';

function UserRecoInputPage() {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const id = user?.id;
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('/recommendations/random')
      .then((res) => { setBooks(res.data); });
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    }}
    >
      <h1>  The More Books You Rate The Better Your Recommendations Will Be </h1>
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '20px',
      }}
      >

        <BookDisplay books={books} id={id} />
      </div>

    </div>
  );
}

export default UserRecoInputPage;
