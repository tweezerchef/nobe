import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import BookDisplay from '../components/BookDisplay/BookDisplay';
import axios from 'axios';

const userString = localStorage.getItem('user');
const user = userString ? JSON.parse(userString) : null;
let id: string
user ? (id = user.id) : (id = '');





const Recommended = () => {
    console.log(id);
    const [books, setBooks] = useState([]);
    useEffect(() => {
        axios.get('/recommendations/recommended/?id=' + id)
        // .then(res => setBooks(res.data))
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

export default Recommended;