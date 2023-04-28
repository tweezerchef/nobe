import react, { useState } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Box from '@mui/joy/Box';
import Button from '@mui/material/Button';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import UserStarRating from '../UserStarRating/UserStarRating';
import UserReview from '../UserStarRating/UserReview'







const BigBook = (props: any) => {
    const [reviewOpen, setReviewOpen] = useState(false);
    const { book, id, onClose } = props;
    const handleOnClick = () => {
        onClose();
    };


    const handleClickOpen = () => {
        setReviewOpen(true);
    };

    const handleClose = () => {
        setReviewOpen(false);
    };


    return (
        <Card key={book.ISBN10} variant="outlined" sx={{ width: 700, height: 1000, margin: '10px', display: 'flex', flexDirection: 'column' }}>
            <CardOverflow sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'your_desired_color', position: 'relative' }}>
                <img
                    src={book.image}
                    loading="lazy"
                    alt=""
                    style={{
                        objectFit: 'contain',
                        width: '100%',
                        height: '100%',
                        imageRendering: 'crisp-edges',
                        position: 'absolute',
                        top: '60%',
                        left: '60%',
                        transform: 'translate(-50%, -50%)'
                    }}
                    onClick={handleOnClick}
                />
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
            <UserStarRating book={book} id={id} />
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Written Review
            </Button>
            <UserReview book={book} id={id} open={reviewOpen} handleClose={handleClose} />
            <Box sx={{ p: 3, flexGrow: 1 }}>
                <Typography level="h2" sx={{ fontSize: 'lg', mt: 2 }}>
                    <span onClick={handleOnClick} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                        {book.title}
                    </span>
                </Typography>
                <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
                    <Link href="#multiple-actions">{book.author}</Link>
                </Typography>
                <Typography level="body1">
                    {book.description}
                </Typography>
                <Typography level="body2">
                    Placeholder Data 2: {book.placeholderData2}
                </Typography>
                <Typography level="body2">
                    Placeholder Data 3: {book.placeholderData3}
                </Typography>
                <Divider inset="context" />
                <Box
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
                    <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                    </Typography>

                </Box>
            </Box>
        </Card>

    )


}

export default BigBook;