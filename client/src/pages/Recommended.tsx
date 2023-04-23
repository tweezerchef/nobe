import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import BookDisplay from '../components/BookDisplay/BookDisplay';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../hooks/Context';

const userString = localStorage.getItem('user');
const user = userString ? JSON.parse(userString) : null;
let id: string
user ? (id = user.id) : (id = '');





const Recommended = () => {
    const id = useContext(UserContext);
    const [books, setBooks] = useState([]);
    useEffect(() => {
        axios.get('/recommendations/recommended/?id=' + id).then(res => setBooks(res.data))
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