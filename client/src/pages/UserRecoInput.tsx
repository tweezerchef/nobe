import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import BookDisplay from '../components/BookDisplay/BookDisplay';
import axios from 'axios';

const userString = localStorage.getItem('user');
const user = userString ? JSON.parse(userString) : null;
let id: any
user ? (id = user.id) : (id = null);





const UserRecoInputPage = () => {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        axios.get('/recommendations/random')
            .then(res => setBooks(res.data))
        //.then(data => setBooks(data));
    }, []);
    console.log(id)

    return (
        <div>
            <Navbar children={undefined} />
            <BookDisplay books={books} />
            <h1>  UserRecoInputPage </h1>
        </div>
    )


}

export default UserRecoInputPage;