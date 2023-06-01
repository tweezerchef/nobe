/* eslint-disable react/function-component-definition */
import React, { useContext } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Box from '@mui/joy/Box';
import { UserBook, Book } from '../../../typings/types';
import BigBook from '../../Book/BookBig';
import UserContext from '../../../hooks/Context';

interface NearMeUserBookProps {
  userBook: UserBook,
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, book: Book) => void;
  showBigBook: boolean;
  bigBookPosition: {
    left: number;
    top: number;
  };
  onClose: () => void;
}
interface BigBookOverlayProps {
  bigBookPosition: {
    left: number;
    top: number;
  };
}
const BigBookOverlay = styled.div<BigBookOverlayProps>`
position: static;
z-index: 10;  left: ${(props) => props.bigBookPosition.left}px;
top: ${(props) => props.bigBookPosition.top}px;
border-radius: 20px;
box-shadow: 3px 3px 1px rgba(0, 0, 0, 0.15);
`;

const useStyles = makeStyles({
  card: {
    // backgroundImage: 'url("https://i.imgur.com/Mjey231.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer',
  },
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Books = Book;

const NearMeUserBook: React.FC<NearMeUserBookProps> = ({
  userBook, onClick, showBigBook, bigBookPosition, onClose,
}) => {
  const { User, Books } = userBook;
  const bookcover = Books.image || 'https://i.imgur.com/XrUd1L2.jpg';
  const book = Books;
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const id = user?.id;
  const [userRating, setUserRating] = React.useState<number>(0);
  const username = User?.username ? User.username : User?.firstName;
  const classes = useStyles();

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onClick(e, book);
  };

  if (book.UserBooks && book.UserBooks.length > 0) {
    book.UserBooks.forEach((entry: any) => {
      if (entry.userId === id && entry.rating !== 0 && userRating === 0) {
        setUserRating(entry.rating);
      }
    });
  }
  if (showBigBook) {
    return (
      <BigBookOverlay bigBookPosition={bigBookPosition}>
        <BigBook
          book={book}
          id={id}
          userRating={userRating}
          setUserRating={setUserRating}
          onClose={() => onClose()}
        />
      </BigBookOverlay>
    );
  }

  return (

    <Card
      variant="outlined"
      sx={{
        width: '24vw',
        height: '100%',
        boxShadow: '0px 0px 25px  rgba(37, 37, 37, 0.6)',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#ececec',
        overflow: 'hidden',
      }}
    >
      <Grid container spacing={0} alignItems="center" justifyContent="space-evenly">
        <Grid item xs={4} textAlign="center">
          <Link to={`/profile/${User?.id}`}>
            <Avatar
              src={User?.picture}
              alt={User?.firstName}
              style={{
                width: '4.75rem',
                height: '4.75rem',
                margin: '0 auto',
              }}
            />
            <Typography level="h5">
              {username}
            </Typography>
          </Link>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={4}>
          <Box
            onClick={handleOnClick}
            className={classes.card}
            overflow="hidden"
          >
            <AspectRatio ratio="2">
              <img src={bookcover} alt="Book Cover" />
            </AspectRatio>
            <Typography level="h6" sx={{ textAlign: 'center' }}>
              {Books.title}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>

  );
};

export default NearMeUserBook;
