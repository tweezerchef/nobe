import React, { useEffect, useState } from 'react';
import moment from 'moment';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ClubHeader } from './style';
import '../styles/discussionPostsStyles.css';

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
  const [clubName, setClubName] = useState('');
  const [clubId, setClubId] = useState('');

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
        setClubName(data.clubs.name);
        setClubId(data.clubsId);
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
    <div className="posts-page">
      {clubName && (
        <ClubHeader>
          <Link
            to={`/clubs/${clubId}?name=${encodeURIComponent(clubName)}`}
            style={{ color: 'black' }}
            className="link"
          >
            {clubName}
          </Link>
          {' '}
          Discussion
        </ClubHeader>
      )}
      <ClubHeader>{discussionTitle}</ClubHeader>
      {posts?.map((post) => (
        <div className="posts-box" key={post.id}>
          <div className="brown-box">
            {'by '}
            {post.user?.username || `${post.user?.firstName} ${post.user?.lastName || ''}`}
            {' '}
            <div className="date-time">
              {moment(post.createdAt).format('h:mm a MMMM D, YYYY')}
            </div>
          </div>
          <div className="post-body">
            {post.body}
            {post.userId === JSON.parse(localStorage.getItem('user') || '{}').id && (
            <Stack direction="row" spacing={1} className="delete-icon">
              <IconButton aria-label="delete" onClick={() => handleDelete(post.id)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
            )}
          </div>
        </div>
      ))}
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="post">Comment:</label>
            <textarea
              className="text-area"
              value={newPost}
              onChange={(event) => setNewPost(event.target.value)}
            />
          </div>
          <div>
            <Button className="post-button" type="submit" variant="contained" size="small">Post</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DiscussionPosts;
