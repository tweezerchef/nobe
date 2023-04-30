import React, { useState, useEffect } from 'react';
import BookDisplay from '../components/BookDisplay/BookDisplay';
import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../hooks/Context';
import { TextField, Button } from '@material-ui/core';


const UserRecoInputPage = () => {
    const userContext = useContext(UserContext);
    const user = userContext?.user;
    const id = user?.id
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState<string>('');
    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     axios.get(`/bookdata/title/searchOne?title=${title}`).then(response => setBooks(response.data))
    //     //.then(() => console.log(books))
    // }
    // const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setTitle(event.target.value);
    // };

    useEffect(() => {
        axios.get('/recommendations/random')
            .then(res => { console.log(res.data), setBooks(res.data) }).then(() => console.log(books))
    }, []);



    return (
        <div>
            <h1>  The More Books You Rate The Better Your Recommendations Will Be </h1>
            {/* <form onSubmit={handleSubmit} >
                <TextField
                    label="Book Title"
                    value={title}
                    onChange={handleTitleChange}
                    fullWidth
                />
                <Button type="submit">Submit</Button>
            </form> */}
            <BookDisplay books={books} id={id} />
            {/* {books.length > 0 && <BigBook book={books[0]} id={id} />} */}

        </div>
    )


}

export default UserRecoInputPage;