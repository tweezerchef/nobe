import axios from "axios";
import React, { useContext } from "react";
import UserContext from "../../hooks/Context";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import IconButton from '@mui/joy/IconButton';
import Book from "../Book/Book";




const WishListButton = (props: any) => {
    const { book } = props;
    const userContext = useContext(UserContext);
    const user = userContext?.user;
    const id = user.id
    //console.log(book)

    const addToWishlist = async () => {
        console.log(book)

        const response = await axios.post(`/user-books/wishlist`, {
            book, id
        });
        console.log(response.data);
        //  catch (error) {
        //     console.error(error);
        // }
    };

    return (
        <>
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
                onClick={() => addToWishlist()}
            >
                <BookmarkAddIcon />
            </IconButton>
        </>
    )
}

export default WishListButton;