import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
// import DeleteButton from '../DeleteButton/DeleteButton';
import { Link as RouterLink } from 'react-router-dom';
import { Container } from '@material-ui/core';
import UserStarRating from '../UserStarRating/UserStarRating';

function BookDisplay(props: any) {
  const { userBooks: array, id } = props;
  return (
    <Container
      component="div"
      maxWidth={false}
      style={{
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
      }}
    >

      {array.length === 0 ? (
        <div />
      ) : (
        array.map((userBook: any) => (
          <Card key={userBook.books.id} variant="outlined" sx={{ width: 380, margin: '10px' }}>
            <CardOverflow>
              <AspectRatio ratio="2">
                <RouterLink to={`/profile/${id}`}>
                  <img src={userBook.books.image} loading="lazy" alt="" />
                </RouterLink>
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
            <Typography
              level="h2"
              sx={{
                fontSize: 'md', mt: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', '-webkit-line-clamp': 2, '-webkit-box-orient': 'vertical',
              }}
            >
              <Link href="#multiple-actions" overlay underline="none">
                {userBook.books.title}
              </Link>
            </Typography>
            <Typography
              level="body2"
              sx={{
                mt: 0.5, mb: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}
            >
              <Link href="#multiple-actions">{userBook.books.author}</Link>
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
                {userBook.books.rating}
              </Typography>
              <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }} />
              <UserStarRating book={userBook} id={id} />
              {/* <DeleteButton userBook={userBook} id={id} getUserBooks={getUserBooks} setUserBooks={setUserBooks} inventory={inventory} /> */}
            </CardOverflow>
          </Card>
        ))
      )}
    </Container>
  );
}
export default BookDisplay;
