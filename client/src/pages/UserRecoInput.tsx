import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import BookDisplay from '../components/BookDisplay/BookDisplay';
import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../hooks/Context';
import Recommendations from '../../../server/routes/recommendations';
import BigBook from '../components/Book/BookBig';






const UserRecoInputPage = () => {
    const userContext = useContext(UserContext);
    const user = userContext?.user;
    const id = user?.id
    const [books, setBooks] = useState([]);
    useEffect(() => {
        axios.get('/recommendations/random')
            .then(res => { console.log(res.data), setBooks(res.data) }).then(() => console.log(books))
        //.then(data => setBooks(data));
    }, []);


    return (
        <div>
            <h1>  The More Books You Rate The Better Your Recommendations Will Be </h1>
            {/* <BookDisplay books={books} id={id} /> */}
            {books.length > 0 && <BigBook book={books[0]} id={id} />}

        </div>
    )


}

export default UserRecoInputPage;