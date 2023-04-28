import react, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

interface UserReviewProps {
    open: boolean;
    handleClose: () => void;
    book: any;
    id: any;
}

const UserReview: React.FC<UserReviewProps> = ({ open, handleClose, book, id }) => {
    const [review, setReview] = useState('');

    const handleReviewChange = ((event: React.ChangeEvent<HTMLInputElement>) => {
        setReview(event.target.value)
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault;
        axios.post('/review/WrittenReview', { review, book, id }).then(handleClose)


    }
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <DialogContentText>Add Your Written Review</DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Review"
                            type="Review"
                            fullWidth
                            variant="standard"
                            onChange={handleReviewChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add Review</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
export default UserReview;