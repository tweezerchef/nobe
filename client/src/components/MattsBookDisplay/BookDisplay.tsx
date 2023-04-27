import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import UserStarRating from '../UserStarRating/UserStarRating';
import DeleteButton from '../DeleteButton/DeleteButton';
import { Link as RouterLink } from 'react-router-dom';





const BookDisplay = (props: any) => {
    const { userBooks: array, id, getUserBooks, setUserBooks, inventory } = props;
    return (
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            {array.length === 0 ? (
                <div></div>
            ) : (
                array.map((userBook: any) => (
                    <Card key={userBook.books.ISBN10} variant="outlined" sx={{ width: 380, margin: '10px' }}>
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
                        <Typography level="h2" sx={{ fontSize: 'md', mt: 2 }}>
                            <Link href="#multiple-actions" overlay underline="none">
                                {userBook.books.title}
                            </Link>
                        </Typography>
                        <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
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
                            <Divider orientation="vertical" />
                            <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                            </Typography>
                            <UserStarRating book={userBook} id={id} />
                            <DeleteButton userBook={userBook} id={id} getUserBooks={getUserBooks} setUserBooks={setUserBooks} inventory={inventory} />
                        </CardOverflow>
                    </Card>
                ))
            )}
        </div>
    )
}
export default BookDisplay