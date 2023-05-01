import axios from 'axios';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import MiniStar from './MiniStar';

interface UserBook {
    title: string;
    author: string;
    rating: number;
    review: string;
    User: {
        id: string;
        picture: string;
        rating: number
        firstName: string;
    };
}
interface ReviewsProps {
    UserBooks: UserBook[]
}


const Reviews = ({ UserBooks }: ReviewsProps) => {
    const filteredUserBooks = UserBooks.filter(
        (userBook) => userBook.review || userBook.User.rating
    );

    return (
        <Box sx={{ width: 320 }}>
            <Typography
                id="ellipsis-list-demo"
                level="body4"
                textTransform="uppercase"
                fontWeight="xl"
                mb={1}
                sx={{ letterSpacing: '0.15rem' }}
            >
                Reviews
            </Typography>
            <List
                aria-labelledby="ellipsis-list-demo"
                sx={{ '--ListItemDecorator-size': '56px' }}
            >
                {filteredUserBooks.map((userBook, index) => (
                    <Link to={`/profile/${userBook.User.id}`} >
                        <ListItem key={index}>
                            <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                                <Avatar src={userBook.User.picture} />
                            </ListItemDecorator>
                            <ListItemContent>
                                <MiniStar value={userBook.rating} />
                                <Typography level="body1" noWrap>
                                    {userBook.User.firstName}'s Review: {userBook.review}
                                </Typography>
                            </ListItemContent>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Box>
    );
};

export default Reviews