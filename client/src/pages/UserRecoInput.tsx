import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import BookDisplay from '../components/BookDisplay/BookDisplay';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../hooks/Context';






const UserRecoInputPage = () => {
    const id = useContext(UserContext);
    console.log(id);
    const [books, setBooks] = useState([]);
    useEffect(() => {
        axios.get('/recommendations/random')
            .then(res => setBooks(res.data))
        //.then(data => setBooks(data));
    }, []);


    return (
        <div>
            <Navbar children={undefined} />
            <BookDisplay books={books} id={id} />
            <h1>  UserRecoInputPage </h1>
        </div>
    )


}

export default UserRecoInputPage;