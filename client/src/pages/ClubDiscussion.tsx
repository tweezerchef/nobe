import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import CardMedia from '@material-ui/core/CardMedia';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import AspectRatio from '@mui/joy/AspectRatio';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { ClubHeader, ClubDescription } from './style';
import JoinClubButton from '../components/Button/JoinClubButton';
import '../styles/clubDiscussionStyle.css';
import DiscussionList from '../components/DiscussionForum/Discussions';
import UserContext from '../hooks/Context';
import Feed from './Feed';
import ProfileCard from '../components/HomePage/ProfileCard/ProfileCard';
import HomeUserDisplay from '../components/UserDisplay/HomeUserdisplay.';
import { Discussion } from '../typings/types';

interface Club {
  clubId: string;
  name: string;
  description: string;
  image: string;
  clubMembers: string[];
}

function ClubDiscussion() {
  const [thisClub, setClub] = useState<Club[]>([]);
  const { id } = useParams<{ id: string }>();
  const [discussionList, setDiscussionList] = useState<Discussion[]>([]);
  const [newDiscussionTitle, setNewDiscussionTitle] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [clubImage, setClubImage] = useState('');
  const [loading, setLoading] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const clubName = searchParams.get('name');
  const clubId = id;

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

  const fetchClubs = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`/api/clubs/${clubId}`);
      setClub(response.data);
      setClubImage(response.data[0]?.image);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchDiscussion() {
      try {
        const { data } = await axios.get(`/api/clubs/${clubId}/discussion`);
        setDiscussionList(data);
      } catch (error) {
        console.error(error);
      }
    }
    if (id) {
      fetchDiscussion();
      fetchClubs();
    }
  }, []);

  const handleSubmit = async () => {
    try {
      if (!user) {
        throw new Error('No user found');
      }
      if (!newDiscussionTitle) {
        alert('Please enter a discussion title');
        return;
      }
      if (!member) {
        alert('Not a member of this club');
        return;
      }
      const response = await axios.post(`/api/clubs/${clubId}/discussion`, {
        title: newDiscussionTitle,
        userId,
      });
      setDiscussionList((discussions) => [...discussions, response.data]);
      setNewDiscussionTitle('');
      setDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

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
            height: '23.48vh',
            maxHeight: '200px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            overflow: 'clip',
            backgroundImage: 'url(https://i.imgur.com/ZmgMDQ2.png)',
          }}
          >
            <ProfileCard />
            {/* <HomeUserDisplay /> */}
          </Box>
          <Box sx={{ width: '100%', maxHeight: '80vh', overflow: 'auto' }}>
            <Feed />
          </Box>
        </Grid>
        <Grid xs={9.5} sx={{ height: '99vh', overflow: 'auto', paddingBottom: '9vh' }}>
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
          <div>
            <Button component={Link} to="/clubs" startIcon={<ArrowBackIcon />}>View All Clubs</Button>
            <ClubHeader style={{ textAlign: 'center' }}>{clubName}</ClubHeader>
            <ClubDescription style={{ textAlign: 'center' }}>{thisClub[0]?.description}</ClubDescription>
            <div style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center',
            }}
            >
              <Card sx={{
                flexBasis: '33%',
                borderRadius: '12px',
                boxShadow: '0px 0px 12px  rgba(37, 37, 37, 0.4)',
                maxWidth: '300px',
              }}
              >
                <AspectRatio ratio="1">
                  {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <CardMedia
                      component="img"
                      alt={`Club image for ${clubName}`}
                      image={clubImage}
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  )}
                </AspectRatio>
              </Card>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Stack
                spacing={2}
                direction="row"
                sx={{
                  paddingTop: '25px',
                  paddingBottom: '10px',
                }}
              >
                <JoinClubButton clubId={clubId} member={member} />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setDialogOpen(!dialogOpen)}
                  disabled={!member}
                >
                  Create a Thread
                </Button>
              </Stack>
            </div>
            {dialogOpen && (
            <Dialog
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>Create a Thread</DialogTitle>
              <DialogContent>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                  <FormControl style={{ width: '100%' }}>
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Thread Title"
                      fullWidth
                      variant="outlined"
                      name="title"
                      value={newDiscussionTitle}
                      onChange={(event) => setNewDiscussionTitle(event.target.value)}
                    />
                  </FormControl>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button type="submit" onClick={handleSubmit}>Submit</Button>
              </DialogActions>
            </Dialog>
            )}
            {clubId && (
            <DiscussionList
              discussions={discussionList}
              clubId={clubId}
              key={discussionList.length}
            />
            )}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ClubDiscussion;
