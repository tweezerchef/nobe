import axios from 'axios';
import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import MiniStar from './MiniStar';
import { url } from 'inspector';


interface UserBook {
    title: string;
    author: string;
    rating: number;
    review: string;
    User: {
        picture: string;
        rating: number
        firstName: string;
    };

    // Add more properties as needed
}
interface ReviewsProps {
    UserBooks: UserBook[]
}


const Reviews = ({ UserBooks }: ReviewsProps) => {
    const UserBook = UserBooks?.length >= 2 ? UserBooks[1] : null;

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
                <ListItem>
                    <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                        <Avatar src={UserBook?.User.picture} />
                    </ListItemDecorator>
                    <ListItemContent>
                        <MiniStar value={UserBook?.rating ?? 0} />
                        <Typography level="body1" noWrap>
                            {UserBook?.User.firstName}'s Review: {UserBook?.review}
                        </Typography>
                    </ListItemContent>
                </ListItem>
            </List>
        </Box>
    );
}

export default Reviews