import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import BookDisplay from '../components/BookDisplay/BookDisplay';
import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../hooks/Context';
import Recommendations from '../../../server/routes/recommendations';






const UserRecoInputPage = () => {
    const userContext = useContext(UserContext);
    const user = userContext?.user;
    const id = user?.id
    const [books, setBooks] = useState([]);
    useEffect(() => {
        axios.get('/recommendations/random')
            .then(res => { setBooks(res.data) })
        //.then(data => setBooks(data));
    }, []);


    return (
        <div>
            <h1>  The More Books You Rate The Better Your Recommendations Will Be </h1>
            <BookDisplay books={books} id={id} />

        </div>
    )


}

export default UserRecoInputPage;