import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import AspectRatio from '@mui/joy/AspectRatio';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import axios from 'axios';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ScrollBar from 'react-scrollbars-custom';
import styled from 'styled-components';
import Feed from './Feed';
// import HomeUserDisplay from '../components/UserDisplay/HomeUserdisplay.';
import ProfileCard from '../components/HomePage/ProfileCard/ProfileCard';
import BookSearchButton from '../components/Button/BookSearchButton';
import UserContext from '../hooks/Context';
import {
  ClubHeader, StyledTextarea, BookTitle, BookHeader,
} from './style';
import '../styles/discussionPostsStyles.css';
// import BookSearchButtonNew from '../components/Button/BookSearchButtonNew';

interface Post {
  id: string;
  body: string;
  userId: string;
  discussionId: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    username: string;
    picture: string;
  }
}

interface Club {
  clubId: string;
  name: string;
  description: string;
  image: string;
  clubMembers: string[];
}

const StyledTrack = styled.div`
    background-color: #f1f1f1;
    left: 2px !important;
`;
const StyledTrackHome = styled.div`
    background-color: #f1f1f1;
    height: 100%;
`;

const StyledThumb = styled.div`
    background-color: #888;
    border-radius: 3px;
`;

const StyledThumbHome = styled.div`
    background-color: #888;
    border-radius: 3px;

`;
const TrackYHome = React.forwardRef<HTMLDivElement>(
  (props, ref) => <StyledTrackHome {...props} ref={ref} />,
);

const ThumbYHome = React.forwardRef<HTMLDivElement>(
  (props, ref) => <StyledThumbHome {...props} ref={ref} />,
);

const TrackY = React.forwardRef<HTMLDivElement>(
  (props, ref) => <StyledTrack {...props} ref={ref} />,
);
const ThumbY = React.forwardRef<HTMLDivElement>(
  (props, ref) => <StyledThumb {...props} ref={ref} />,
);

function DiscussionPosts() {
  const { id } = useParams<{ id: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [discussionTitle, setDiscussionTitle] = useState('');
  const [clubName, setClubName] = useState('');
  const [clubId, setClubId] = useState('');
  const [isDiscussionCreator, setIsDiscussionCreator] = useState(false);
  const [discussionImage, setDiscussionImage] = useState('');
  const [bookTitle, setBookTitle] = useState('');

  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const userId = user?.id;

  const colWidth = {
    xs: 12, sm: 6, md: 4, lg: 3,
  } as const;

  const member = user?.clubMembers?.reduce((acc: boolean, club: Club) => {
    if (club.clubId === clubId) {
      acc = true;
      return acc;
    }
    return acc;
  }, false);

  async function fetchImage() {
    const response = await axios.get(`/api/clubs/discussions/${id}`);
    // console.log(response);
    if (response.data && response.data.image) {
      setDiscussionImage(response.data.image);
    }
    setBookTitle(response.data.bookTitle);
  }

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
        setIsDiscussionCreator(data.creator.id === userId);
      } catch (error) {
        console.error(error);
      }
    }
    if (id) {
      getPosts();
      getDiscussionTitle();
    }
    fetchImage();
  }, [id, discussionTitle, newPost]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!member) {
      alert('Not a member of this club');
      return;
    }

    if (newPost.trim().length === 0) {
      alert('Post cannot be empty!');
      return;
    }

    try {
      const currentDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
      const { data } = await axios.post(`/api/clubs/${id}/posts`, {
        userId: user?.id,
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
    <Box sx={{
      flexGrow: 1, overflow: 'clip', height: '98vh',
    }}
    >
      <Grid
        container
        spacing={0}
        sx={(theme) => ({
          '--Grid-borderWidth': '1px',
          borderTop: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider',
          '& > div': {
            borderRight: 'var(--Grid-borderWidth) solid',
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
            ...(Object.keys(colWidth) as Array<keyof typeof colWidth>).reduce(
              (result, key) => ({
                ...result,
                [`&:nth-of-type(${12 / colWidth[key]}n)`]: {
                  [theme.breakpoints.only(key)]: {
                    borderRight: 'none',
                  },
                },
              }),
              {},
            ),
          },
        })}
      >
        <Grid
          xs={2.5}
          sx={{
            position: 'sticky', top: '0px', height: '100vh', paddingBottom: '8vh',
          }}
        >
          <Box sx={{
            width: '100%',
            height: '200px',
            backgroundSize: 'cover',
            backgroundPosition: 'right 40% bottom 69%',
            overflow: 'hidden',
            backgroundImage: 'url(https://i.imgur.com/ZmgMDQ2.png)',
          }}
          >
            <ProfileCard />
            {/* <HomeUserDisplay /> */}
          </Box>
          <ScrollBar
            style={{ width: '100%', height: '100%' }}
            trackYProps={{
              renderer: (props) => {
                const { elementRef, ...restProps } = props;
                return <TrackY {...restProps} ref={elementRef} />;
              },
            }}
            thumbYProps={{
              renderer: (props) => {
                const { elementRef, ...restProps } = props;
                return <ThumbY {...restProps} ref={elementRef} />;
              },
            }}
          >
            <Feed />
          </ScrollBar>
        </Grid>
        <Grid xs={9.5} sx={{ height: '99vh', overflow: 'auto', paddingBottom: '9vh' }}>
          <ScrollBar
            style={{ overflow: 'hide' }}
            noScrollX
            trackYProps={{
              renderer: (props) => {
                const { elementRef, ...restProps } = props;
                return <TrackYHome {...restProps} ref={elementRef} />;
              },
            }}
            thumbYProps={{
              renderer: (props) => {
                const { elementRef, ...restProps } = props;
                return <ThumbYHome {...restProps} ref={elementRef} />;
              },
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '23.48vh',
                maxHeight: '200px',
                backgroundImage: 'url(https://i.imgur.com/oB9cYCo.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
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
                Thread
              </ClubHeader>
              )}
              <ClubHeader>{discussionTitle}</ClubHeader>
              <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
              }}
              >
                {discussionImage && bookTitle && (
                <div>
                  <BookHeader>Currently Reading:</BookHeader>
                  <Card sx={{
                    flexBasis: '33%',
                    borderRadius: '12px',
                    boxShadow: '0px 0px 12px  rgba(37, 37, 37, 0.4)',
                    width: '300px',
                    // padding: '1rem',
                    backgroundImage: 'url("https://i.imgur.com/Mjey231.jpg")',
                  }}
                  >
                    <AspectRatio ratio="1">
                      <CardMedia
                        component="img"
                        alt={`Discussion book image for ${discussionTitle}`}
                        image={discussionImage}
                        style={{
                          objectFit: 'fill',
                        }}
                      />
                    </AspectRatio>
                    <BookTitle>{bookTitle}</BookTitle>
                    {/* <img
                  alt=""
                  title="ay"
                  src={discussionImage}
                  height="100px"
                /> */}
                  </Card>
                </div>
                )}
              </div>
              {/* <BookSearchButtonNew
              isDiscussionCreator={isDiscussionCreator}
              discussionId={id}
              discussionImage={discussionImage}
              setDiscussionImage={setDiscussionImage}
              clubId={clubId}
            /> */}
              <BookSearchButton
                isDiscussionCreator={isDiscussionCreator}
                discussionId={id}
                discussionImage={discussionImage}
                setDiscussionImage={setDiscussionImage}
                clubId={clubId}
                setBookTitle={setBookTitle}
              />
              {posts?.map((post) => (
                <div className="post">
                  <div className="post-content" key={post.id}>
                    {/* <div className="icons-wrapper">
                    <ThumbUpAltIcon className="thumb-icon" />
                    <ThumbDownAltIcon className="thumb-icon" />
                  </div> */}
                    <div className="brown-box">
                      <div className="post-info-container">
                        <Link to={`/profile/${post.userId}`}>
                          <Avatar
                            src={post.user?.picture}
                            alt={post.user?.username}
                            className="avatar"
                          />
                        </Link>
                        <Link to={`/profile/${post.userId}`} className="username-link">
                          {post.user?.username || `${post.user?.firstName} ${post.user?.lastName || ''}`}
                        </Link>
                        <div className="date-time">
                          {moment(post.createdAt).format('h:mm a MM/DD/YY')}
                        </div>
                      </div>
                    </div>

                    <div className="post-body">
                      {post.body}
                      {post.userId === userId && (
                      <Stack direction="row" spacing={1} className="delete-icon">
                        <IconButton aria-label="delete" onClick={() => handleDelete(post.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div className="form-div">
                <form onSubmit={handleSubmit}>
                  <div className="input-container">
                    Comment:
                    <StyledTextarea
                      minRows={8}
                      className="text-area"
                      value={newPost}
                      onChange={(event) => setNewPost(event.target.value)}
                    />
                  </div>
                  <div>
                    <Button className="post-button" type="submit" variant="contained" size="small" style={{ marginTop: 5 }}>Post</Button>
                  </div>
                </form>
              </div>
            </div>
          </ScrollBar>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DiscussionPosts;
