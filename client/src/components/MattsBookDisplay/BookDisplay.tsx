import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import UserStarRating from '../UserStarRating/UserStarRating';




const BookDisplay = (props: any) => {
    const { books: array, id } = props;
    return (
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            {array.length === 0 ? (
                <div></div>
            ) : (
                array.map((book: any) => (
                    <Card key={book.ISBN10} variant="outlined" sx={{ width: 380, margin: '10px' }}>
                        <CardOverflow>
                            <AspectRatio ratio="2">
                                <img
                                    src={book.image}
                                    loading="lazy"
                                    alt=""
                                />
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
                                {book.title}
                            </Link>
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
                            <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                            </Typography>
                            <UserStarRating book={book} id={id} />
                        </CardOverflow>
                    </Card>
                ))
            )}
        </div>
    )
}
export default BookDisplay