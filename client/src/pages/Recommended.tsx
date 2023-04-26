import React, { useState, useEffect, useContext } from 'react';
import BookDisplay from '../components/BookDisplay/BookDisplay';
import axios from 'axios';
import UserContext from '../hooks/Context'



const Recommended = () => {
    const userContext = useContext(UserContext);
    const user = userContext?.user;
    const id = user.id;
    const [books, setBooks] = useState([]);
    useEffect(() => {
        axios.get('/recommendations/recommended/?id=' + id).then(res => setBooks(res.data))
        //.then(data => setBooks(data));
    }, []);


    return (
        <div>
            <BookDisplay books={books} id={id} />
            <h1>  UserRecoInputPage </h1>
        </div>
    )


}

export default Recommended;