import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const UserStarRating = (props: any) => {
    const [value, setValue] = React.useState<number | null>(0);
    const { book, id } = props;
    console.log(book, id);
    React.useEffect(() => {
        console.log(book, id);
        // Make an API call to update the rating on the server
        axios.post('/review', { rating: value, book: book, id: id })
            .then(response => {
                console.log('Rating updated successfully');
            })
            .catch(error => {
                console.error('Failed to update rating:', error);
            });
    }, [setValue]);

    return (
        <Box
            sx={{
                '& > legend': { mt: 2 },
            }}
        >
            <Typography component="legend">Your Rating</Typography>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            />
        </Box>
    );
}

export default UserStarRating