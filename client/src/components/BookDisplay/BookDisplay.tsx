// import React from 'react';
// import AspectRatio from '@mui/joy/AspectRatio';
// import Card from '@mui/joy/Card';
// import CardOverflow from '@mui/joy/CardOverflow';
// import Divider from '@mui/joy/Divider';
// import Typography from '@mui/joy/Typography';
// import IconButton from '@mui/joy/IconButton';
// import Link from '@mui/joy/Link';
// import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
// import UserStarRating from '../UserStarRating/UserStarRating';
import Book from '../Book/Book';






const BookDisplay = (props: any) => {
    const { books: array, id } = props;
    return (
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            {array.length === 0 ? (
                <div></div>
            ) : (
                array.map((book: any) => (
                    <Book book={book} id={id} />
                ))
            )}
        </div>
    )
}
export default BookDisplay