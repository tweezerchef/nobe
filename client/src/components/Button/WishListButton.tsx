import axios from "axios";
import React, { useContext } from "react";
import UserContext from "../../hooks/Context";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import IconButton from '@mui/joy/IconButton';
import { Tooltip } from "@material-ui/core";




const WishListButton = (props: any) => {
    const { book } = props;
    const userContext = useContext(UserContext);
    const user = userContext?.user;
    const id = user.id;

    const addToWishlist = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();

        const response = await axios.post(`/user-books/wishlist`, {
            book,
            id,
        });

        console.log(response.data);
    };

    return (
        <Tooltip title="Add to Wishlist" placement="top-end">
            <IconButton
                aria-label="Add to Wishlist"
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
                onClick={addToWishlist}
            >
                <BookmarkAddIcon />
            </IconButton>
        </Tooltip>
    );
};

export default WishListButton;