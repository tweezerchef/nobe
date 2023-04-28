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
import { createTheme, ThemeProvider } from '@mui/material/styles';


const customTheme = createTheme({
    typography: {
        // This will use the default MUI typography settings
    },
});




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

    if (showBigBook) {
        return <BigBook book={book} id={id} onClose={() => setShowBigBook(false)} />;
    }


    return (

        <Card key={book.ISBN10} variant="outlined" sx={{ width: 380, margin: '10px', borderRadius: 4 }}>
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
            <Typography level="h1" sx={{
                fontSize: '30px !important',
                mt: 2,
                '& a': {
                    color: 'inherit !important',
                    textDecoration: 'none !important',
                },
            }} onClick={handleOnClick}>
                {/* <Link href="#multiple-actions" overlay underline="none"> */}
                {book.title}
                {/* </Link> */}
            </Typography>
            <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
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
                <Divider orientation="vertical" />
                <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}></Typography>
                <UserStarRating book={book} id={id} />
            </CardOverflow>
        </Card>

    );
});

export default Book