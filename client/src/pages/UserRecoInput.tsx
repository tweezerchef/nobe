import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import BookDisplay from '../components/BookDisplay/BookDisplay';
import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../hooks/Context';
import Recommendations from '../../../server/routes/recommendations';
import BigBook from '../components/Book/BookBig';
import { Typography, Grid, Card, CardMedia, CardContent, FormControl, TextField, Checkbox, FormControlLabel, Button } from '@material-ui/core';





const UserRecoInputPage = () => {
    const userContext = useContext(UserContext);
    const user = userContext?.user;
    const id = user?.id
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState<string>('');
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.get(`/bookdata/title?title=${title}`).then(response => setBooks(response.data))
        //.then(() => console.log(books))
    }
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    useEffect(() => {
        axios.get('/recommendations/random')
            .then(res => { console.log(res.data), setBooks(res.data) }).then(() => console.log(books))
        //.then(data => setBooks(data));
    }, []);
    useEffect(() => {
        console.log(books);
    }, [books]);


    return (
        <div>
            <h1>  The More Books You Rate The Better Your Recommendations Will Be </h1>
            <form onSubmit={handleSubmit} >
                <TextField
                    label="Book Title"
                    value={title}
                    onChange={handleTitleChange}
                    fullWidth
                />
                <Button type="submit">Submit</Button>
            </form>
            <BookDisplay books={books} id={id} />
            {/* {books.length > 0 && <BigBook book={books[0]} id={id} />} */}

        </div>
    )


}

export default UserRecoInputPage;