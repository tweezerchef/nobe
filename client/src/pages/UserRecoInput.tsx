import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import BookDisplay from '../components/BookDisplay/BookDisplay';
import axios from 'axios';

const userString = localStorage.getItem('user');
const user = userString ? JSON.parse(userString) : null;
const { id } = user;

const [books, setBooks] = useState([]);



const UserRecoInputPage = () => {
    useEffect(() => {
        axios.get('/recommendations/random')
            .then(res => console.log(res.data))
        //.then(data => setBooks(data));
    }, []);

    return (
        <div>
            <Navbar children={undefined} />
            <BookDisplay books={books} />
        </div>
    );
};


return (
    <div>
        <Navbar children={undefined} />
        <BookDisplay books={books} />
        <h1>  UserRecoInputPage </h1>
    </div>
)


}

export default UserRecoInputPage;