import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Card, CardMedia, CardContent, FormControl, TextField, Checkbox, FormControlLabel, Button } from '@material-ui/core';
//import BookDisplay from '../components/MattsBookDisplay/BookDisplay';
import BookDisplay from '../components/BookDisplay/BookDisplay';
import UserContext from '../hooks/Context'
import ChatContext from '../hooks/ChatContext';
import UserBooks from '../../../server/routes/userbooks';
import Chat from '../components/Chat/Chat'
interface UserBook {
  Books: Book;
  // Add any other properties if necessary
}
interface Book {
  books: {
    id: string;
    title: string;
    author: string;
    image: string;
  }
  id: string;
  wishlist: boolean;
  owned: boolean;
}

const Profile = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [inventory, setInventory] = useState<string>('Owned');
  const [title, setTitle] = useState<string>('');
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const chatContext = useContext(ChatContext);
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  console.log('user', user)
  const id = user.id

  const { userId } = useParams<{ userId: string }>();


  const getUserBooks = () => {
    const booksArray: Book[] = [];
    user?.UserBooks?.forEach((book: UserBook) => {
      booksArray.push(book.Books);
    });
    setBooks(booksArray);
  }

  const sendMessage = (message: string) => {
    if (chatContext && user) {
      const newMessage = {
        text: message,
        sender: id,
        name: user.firstName,
        recipient: userId,
        createdAt: new Date(),
      };
      chatContext.setMessages([...chatContext.messages, newMessage]);
    }
  };

  if (!chatContext) {
    return <div>Loading chat...</div>;
  }

  const { messages } = chatContext;

  const handleChatButtonClick = () => {
    setShowChat(!showChat);
  };

  const addFriend = async () => {
    const user = localStorage.getItem("user");
    const parsed = JSON.parse(localStorage.getItem("user") || '{}');
    const userId = parsed.id;

    const friendId = id;

    try {
      await axios.post('/api/friendship', { userId, friendId });

    } catch (error) {
      console.error(error)
    }
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const ownedClicked = () => {
    //getUserBooks('Owned');
    //setInventory('Owned');
  }

  const wishClicked = () => {
    //getUserBooks('Wishlist')
    setInventory('Wishlist');
  }



  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios.post(`/books/${id}`, { title, inventory })
      .then(response => {
        setTitle("");
        //getUserBooks(inventory);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (user && !isUserLoaded) {
      setIsUserLoaded(true);
      getUserBooks();
    }
  }, [user, isUserLoaded]);

  return (
    <div >
      <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
        <Typography variant="h4">{`${user.firstName}'s`} Books</Typography>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', background: 'rgb(32, 32, 35)', marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '800px', width: '100%' }}>
            <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={ownedClicked}>Owned</Button>
            <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={wishClicked}>WishList</Button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <form onSubmit={handleSubmit} >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <TextField
                  label="Book Title"
                  value={title}
                  onChange={handleTitleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Add Book
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
        <div style={{ margin: '15px' }}>
          <Typography variant="h5">{inventory} Books</Typography>
        </div>
        {user && <BookDisplay books={books} id={user.id} />}
      </div>
      <button onClick={addFriend}>Add friend</button>
      <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={handleChatButtonClick}>
        Chat
      </Button>
      {showChat && <Chat messages={messages} onSend={sendMessage} />}
    </div>
  );
}

export default Profile;
