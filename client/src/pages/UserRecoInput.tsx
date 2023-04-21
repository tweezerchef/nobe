import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import BookDisplay from '../components/BookDisplay/BookDisplay';

const userString = localStorage.getItem('user');
const user = userString ? JSON.parse(userString) : null;
const { id } = user;

const [books, setBooks] = useState([]);



const UserRecoInputPage = () => {



    return (
        <div>
            <Navbar children={undefined} />
            <BookDisplay books={books} />
            <h1>  UserRecoInputPage </h1>
        </div>
    )


}

export default UserRecoInputPage;