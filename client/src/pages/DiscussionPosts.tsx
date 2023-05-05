import React, { useEffect, useState } from 'react';
import moment from 'moment';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
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

  // // eslint-disable-next-line no-console
  // console.log(format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"));

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

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
          <h3>{post.body}</h3>
          {/* <p>userId: {post.userId}</p> */}
          <p>
            {post.user?.firstName}
            {' '}
            {moment(post.createdAt).format('h:mm a MMMM D, YYYY')}
          </p>
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
          value={newPost}
          onChange={(event) => setNewPost(event.target.value)}
          placeholder="Write a new post"
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default DiscussionPosts;
