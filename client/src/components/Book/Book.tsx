import React, { useContext, useState } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import UserStarRating from '../UserStarRating/UserStarRating';
import UserContext from '../../hooks/Context';
import BigBook from './BookBig';
import styled from 'styled-components'
const BigBookOverlay = styled.div`
  position: fixed;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
`;



const Book = React.memo((props: any) => {

    const [showBigBook, setShowBigBook] = useState(false);
    const { book } = props;
    const userContext = useContext(UserContext);
    const user = userContext?.user;
    const id = user.id
    if (!book) {
        return null;
    }
    const handleOnClick = () => {
        setShowBigBook(true);
    };
    let value = 0
    if (book.UserBooks && book.UserBooks.length > 0) {
        book.UserBooks.every((entry: any) => {
            if (entry.userId === id && entry.rating !== 0) {
                value = entry.rating;
                return false
            }
        })
    }
    if (showBigBook) {
        return (
            <BigBookOverlay>
                <BigBook book={book} id={id} userRating={value} onClose={() => setShowBigBook(false)} />
            </BigBookOverlay>
        );
    }


    return (

        <Card key={book.ISBN10} variant="outlined" sx={{ width: 380, margin: '10px' }}>
            <CardOverflow onClick={handleOnClick}>
                <AspectRatio ratio="2">
                    <img src={book.image} loading="lazy" alt="" />
                </AspectRatio>
                <IconButton
                    aria-label="Like minimal photography"
                    size="md"
                    variant="solid"
                    color="danger"
                    sx={{
                        position: 'absolute',
                        zIndex: 2,
                        borderRadius: '50%',
                        right: '1rem',
                        bottom: 0,
                        transform: 'translateY(50%)',
                    }}
                >
                    <BookmarkAddIcon />
                </IconButton>
            </CardOverflow>
            <Typography level="body1" sx={{ fontSize: "1.5rem !important", mt: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', '-webkit-line-clamp': 2, '-webkit-box-orient': 'vertical' }} >
                <Link onClick={handleOnClick}>
                    {book.title}
                </Link>
            </Typography>
            <Typography level="body2" sx={{ mt: 0.5, mb: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <Link href="#multiple-actions">{book.author}</Link>
            </Typography>
            <Divider inset="context" />
            <CardOverflow
                variant="soft"
                sx={{
                    display: 'flex',
                    gap: 1.5,
                    py: 1.5,
                    px: 'var(--Card-padding)',
                    bgcolor: 'background.level1',
                }}
            >
                <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary', fontSize: 'md' }}>
                    {book.rating}
                </Typography>
                <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}></Typography>
                <UserStarRating book={book} id={id} value={value} />
            </CardOverflow>
        </Card>

    );
});

export default Book