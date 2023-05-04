import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../hooks/Context";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import IconButton from '@mui/joy/IconButton';
import { Tooltip } from "@material-ui/core";


interface UserBook {
    wishlist: boolean;
    Books: {
        title: string;
    };
}

type CustomColor = 'success' | 'danger';
const WishListButton = (props: any) => {
    const { book } = props;
    const userContext = useContext(UserContext);
    const user = userContext?.user;
    const id = user.id;
    const [color, setColor] = useState<CustomColor>("danger");
    const [toolTip, setToolTip] = useState<NonNullable<React.ReactNode>>(<h1>Add to Wishlist</h1>);


    const addToWishlist = async (event: React.MouseEvent<HTMLButtonElement>) => {

        console.log('user', user)
        console.log(book.title)
        const title = book.title;

        event.stopPropagation();
        axios.post(`/api/wishlist/${id}`, {
            title,
            id,
            color,
        });
        if (color === "success") {
            setColor("danger" as CustomColor)
            setToolTip(<h1>Add to Wishlist</h1>)
        } else {
            setColor("success" as CustomColor)
            setToolTip(<h1>Remove from Wishlist</h1>)
        }

    };
    useEffect(() => {

        const isBookInArray = user.UserBooks.some((book1: UserBook) => book1.Books.title.toUpperCase() === book.title && book1.wishlist === true);

        if (isBookInArray)
            setColor("success" as CustomColor)
        setToolTip(<h1>Remove from Wishlist</h1>)
    }, [book, id])



    return (

        <Tooltip title={toolTip} placement="top-end">
            <IconButton
                aria-label="Add to Wishlist"
                size="md"
                variant="solid"
                color={color}
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