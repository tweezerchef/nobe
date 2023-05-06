import React, { useEffect, useState } from 'react';
import moment from 'moment';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { useParams } from 'react-router';
import { ClubHeader } from './style';

interface Post {
  id: string;
  body: string;
  userId: string;
  discussionId: string;
  createdAt: string;
  user: {
    lastName: string;
    username: string;
    firstName: string;
  }
}

function DiscussionPosts() {
  const { id } = useParams<{ id: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [discussionTitle, setDiscussionTitle] = useState('');

  useEffect(() => {
    async function getPosts() {
      try {
        const { data } = await axios.get(`/api/clubs/${id}/posts`);
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    }
    async function getDiscussionTitle() {
      try {
        const { data } = await axios.get(`/api/clubs/discussions/${id}`);
        setDiscussionTitle(data.title);
      } catch (error) {
        console.error(error);
      }
    }
    if (id) {
      getPosts();
      getDiscussionTitle();
    }
  }, [id, discussionTitle, newPost]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (newPost.trim().length === 0) {
      alert('Post cannot be empty!');
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const currentDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
      const { data } = await axios.post(`/api/clubs/${id}/posts`, {
        userId: user.id,
        body: newPost,
        createdAt: currentDate,
      });
      setPosts([...posts, data]);
      setNewPost('');
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(postId: string) {
    try {
      await axios.delete(`/api/clubs/${id}/posts/${postId}`);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <ClubHeader style={{ textAlign: 'center' }}>{discussionTitle}</ClubHeader>
      {posts?.map((post) => (
        <div key={post.id}>
          <p>
            {'by '}
            {post.user?.username || `${post.user?.firstName} ${post.user?.lastName || ''}`}
            {' '}
            {moment(post.createdAt).format('h:mm a MMMM D, YYYY')}
          </p>
          <h3>{post.body}</h3>
          {post.userId === JSON.parse(localStorage.getItem('user') || '{}').id && (
            <Stack direction="row" spacing={1}>
              <IconButton aria-label="delete" onClick={() => handleDelete(post.id)}>
                <DeleteIcon />
              </IconButton>
              {/* <button onClick={() => handleDelete(post.id)}>Delete</button> */}
            </Stack>
          )}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <textarea
          style={{ height: '100px', width: '300px' }}
          value={newPost}
          onChange={(event) => setNewPost(event.target.value)}
          placeholder="Write a new post"
        />
        <div style={{ marginTop: '2px' }}>
          <Button type="submit" variant="contained" size="small">Post</Button>
        </div>
      </form>
    </div>
  );
}

export default DiscussionPosts;
