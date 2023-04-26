import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import BookDisplay from '../components/BookDisplay/BookDisplay';
import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../hooks/Context';






const UserRecoInputPage = () => {
    const userContext = useContext(UserContext);
    const user = userContext?.user;
    const id = user?.id
    const [books, setBooks] = useState([]);
    useEffect(() => {
        axios.get('/recommendations/random')
            .then(res => { console.log(res.data), setBooks(res.data) })
        //.then(data => setBooks(data));
    }, []);


    return (
        <div>
            /* <BookDisplay books={books} id={id} /> */
            <h1>  UserRecoInputPage </h1>
        </div>
    )


}

export default UserRecoInputPage;