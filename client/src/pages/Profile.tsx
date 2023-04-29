import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { Typography, Grid, TextField, Button } from '@material-ui/core';
import BookDisplay from '../components/BookDisplay/BookDisplay';
import UserContext from '../hooks/Context'
import ChatContext from '../hooks/ChatContext';
import Chat from '../components/Chat/Chat'



interface UserBook {
  Books: Book;
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

interface UserProfile {
  id: string;
  firstName: string;
}


const Profile = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [inventory, setInventory] = useState<string>('Owned');
  const [title, setTitle] = useState<string>('');
  const [showChat, setShowChat] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const chatContext = useContext(ChatContext);

  const userContext = useContext(UserContext);
  const user = userContext?.user;
  console.log('user', user)
  const id = user.id
  const friendId: string = useParams().id || "";

  console.log('friendId', friendId)

  const getProfile = async () => {
    try {
      const response = await axios.get(`/user/${friendId}`);
      console.log('profile', response.data);
      setProfile(response.data);
    } catch (error) {
      console.error(error);
    }
  }


  const getUserBooks = () => {
    const booksArray: Book[] = [];
    user?.UserBooks?.forEach((book: UserBook) => {
      booksArray.push(book.Books);
    });
    setBooks(booksArray);
  }

  const sendMessage = async (message: string) => {
    if (chatContext && user) {
      const newMessage = {
        text: message,
        senderId: id,
        name: user.firstName,
        recipientId: friendId,
        createdAt: new Date(),
      };
      try {
        const response = await axios.post('/direct-messages', newMessage);
        chatContext.setMessages([...chatContext.messages, response.data]);
      } catch (error) {
        console.log('Error sending message:', error);
      }
    }
  };

  if (!chatContext) {
    return <div>Loading chat...</div>;
  }

  const { messages } = chatContext;

  const handleChatButtonClick = () => {
    setShowChat(!showChat);
  };

  const follow = async () => {
    const userId = user.id;

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
    if (user && user.UserBooks) {
      getUserBooks();
      getProfile();
    }
  }, []);

  return (

    <div >
      <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
        <Typography variant="h4">{friendId === "" ? `${user.firstName}'s` : `${profile?.firstName}'s`} Books</Typography>
        {friendId === "" ? null : (
          <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={follow}>Follow</Button>)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', background: 'rgb(32, 32, 35)', marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '800px', width: '100%' }}>
            <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={ownedClicked}>Owned</Button>
            <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={wishClicked}>WishList</Button>
          </div>
        </div>

        {friendId === "" ? (

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

        ) : null}

        <div style={{ margin: '15px' }}>
          <Typography variant="h5">{inventory} Books</Typography>
        </div>
        <BookDisplay books={books} id={id} />
      </div>
      <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={handleChatButtonClick}>
        Chat
      </Button>
      {showChat && <Chat messages={messages} onSend={sendMessage} />}
    </div>
  );
}


export default Profile;
