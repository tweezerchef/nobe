import React, {
  // useState,
  // useEffect, useRef,
  useContext,
} from 'react';

import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import { Paper } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import Modal from '@mui/material/Modal';
import { ModalClose } from '@mui/joy';
import UserContext from '../../hooks/Context';
import ModeToggle from '../ColorMode/ColorModeToggle';
import NotificationIcon from '../ActionButton/ActionButton';
// import NotificationMobile from '../NotificationMessages/Notificationsmobile';
import Chat from '../Chat/Chat';
// import StyledBox from './style';
import NearBy from '../NearBy/NearBy';
import { useChatContext } from '../../hooks/ChatContext';

const StyledLink = styled(Link)`
  color: white !important;
  font-family: sans-serif !important;
  text-transform: capitalize !important;
  display: block !important;
`;
interface ResponsiveAppBarProps {
  setMode: () => void;
  setJoyMode: () => void;
}

const StyledButton = styled(Button)`
color: white !important;
  font-family: sans-serif !important;
  text-transform: capitalize !important;
  display: block !important;


`;

function ResponsiveAppBar({ setMode, setJoyMode }: ResponsiveAppBarProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const { chatState, setChatState, chatUser } = useChatContext();

  const [open, setOpen] = React.useState(false);

  const userContext = useContext(UserContext);
  const user = userContext?.user;

  let loggedIn = false;

  if (!user) {
    loggedIn = false;
  } else {
    loggedIn = true;
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const navigate = useNavigate();

  const handleLookForBooksClick = async () => {
    try {
      const response = await axios.get('/location/locations', { params: { lon: user?.longitude, lat: user?.latitude, radius: user?.radius } });
      const data = await response.data;
      navigate('/locations', { state: data });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChatButtonClick = () => {
    setChatState(!chatState);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#1976d2 !important' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AutoStoriesIcon sx={{ display: { xs: 'none !important', md: 'flex !important', color: 'white !important' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: '2 !important',
              display: { xs: 'none !important', md: 'flex !important' },
              fontFamily: 'monospace !important',
              fontWeight: '700 !important',
              letterSpacing: '.3rem !important',
              color: 'white !important',
              textDecoration: 'none !important',
            }}
          >
            Nobe
          </Typography>

          <Box sx={{ flexGrow: '1 !important', display: { xs: 'flex !important', md: 'none !important', color: 'white !important' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block !important', md: 'none !important' },
              }}
            >
              <MenuItem
                onClick={handleCloseNavMenu}
                sx={{
                  display: 'block !important', padding: '8px !important',
                }}
              >
                <Typography>
                  <Link to="/booksearch">
                    BookSearch

                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={handleCloseNavMenu}
                sx={{
                  display: 'block !important', padding: '8px !important',
                }}
              >
                <Typography>
                  <Link to="/trending">
                    Trending

                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={handleCloseNavMenu}
                sx={{
                  display: 'block !important', padding: '8px !important',
                }}
              >
                <Typography>
                  <Link to="/clubs">
                    Clubs

                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={handleCloseNavMenu}
                sx={{
                  display: 'block !important', padding: '8px !important',
                }}
              >
                <Typography>
                  <Link to="/locations">
                    Books Near Me

                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={handleCloseNavMenu}
                sx={{
                  display: 'block !important', padding: '8px !important',
                }}
              >
                <Typography>
                  <Link to="/reading-spots">
                    Top Reading Spots

                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={handleCloseNavMenu}
                sx={{
                  display: 'block !important', padding: '8px !important',
                }}
              >
                <Typography>
                  <Link to="/user-reco-input">
                    Build Recomendations

                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={handleCloseNavMenu}
                sx={{
                  display: 'block !important', padding: '8px !important',
                }}
              >
                <Typography>
                  <Link to="/recommended">
                    Get Recomendations

                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={handleCloseNavMenu}
                sx={{
                  display: 'block !important', padding: '8px !important',
                }}
              >
                <Typography>
                  <Link to="/feed">
                    Feed

                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={handleCloseNavMenu}
                sx={{
                  display: 'block !important', padding: '8px !important',
                }}
              >
                <Typography>
                  Notifications
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <AutoStoriesIcon sx={{ display: { xs: 'flex !important', md: 'none !important', color: 'white !important' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: '2 !important',
              display: { xs: 'flex !important', md: 'none !important' },
              flexGrow: '1 !important',
              fontFamily: 'monospace !important',
              fontWeight: '700 !important',
              letterSpacing: '.3rem !important',
              color: 'white !important',
              textDecoration: 'none !important',
            }}
          >
            Nobe
          </Typography>
          <Box sx={{ flexGrow: '1 !important', display: { xs: 'none !important', md: 'flex !important' } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: '2 !important', color: 'white !important', display: 'block !important' }}
            >
              <StyledLink to="/trending">Trending</StyledLink>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: '2 !important', color: 'white !important', display: 'block !important' }}
            >
              <StyledLink to="/clubs">Clubs</StyledLink>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: '2 !important', color: 'white !important', display: 'block !important' }}
            >
              {user?.radius && user?.latitude && user?.latitude > 0 && user?.radius > 0
                ? <StyledButton onClick={handleLookForBooksClick}>Books Near Me</StyledButton>
                : (<StyledButton onClick={handleOpen}>Books Near Me</StyledButton>)}
            </Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <Box sx={style}>
                <ModalClose
                  variant="outlined"
                  sx={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                    borderRadius: '50%',
                    bgcolor: 'background.body',
                  }}
                  onClick={() => handleClose()}
                />
                <NearBy />
              </Box>
            </Modal>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: '2 !important', color: 'white !important', display: 'block !important' }}
            >
              <StyledLink to="/reading-spots">Top Reading Spots</StyledLink>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: '2 !important', color: 'white !important', display: 'block !important' }}
            >
              <StyledLink to="/user-reco-input">Build Recomendations</StyledLink>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: '2 !important', color: 'white !important', display: 'block !important' }}
            >
              <StyledLink to="/recommended">Get Recommendations</StyledLink>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: '2 !important', color: 'white !important', display: 'block !important' }}
            >
              <StyledLink to="/feed">Feed</StyledLink>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: '2 !important', color: 'white !important', display: 'block !important' }}
            >
              <StyledLink to="/booksearch">Book Search</StyledLink>
            </Button>
            <NotificationIcon />
            <div style={{ position: 'relative' }}>
              <IconButton style={{ width: '32px', margin: '10px' }} onClick={handleChatButtonClick}>
                <ChatIcon />
              </IconButton>
              {chatState && (
                <Chat chatUser={chatUser} />
              )}
            </div>
          </Box>
          <Box sx={{ flexGrow: '0 !important', display: 'block !important' }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: '0 !important' }}>
              <Avatar alt="pfp" src={loggedIn ? user?.picture : ''} />
            </IconButton>
            <Menu
              sx={{ mt: '45px !important', display: 'block !important' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={handleCloseUserMenu}
                sx={{
                  display: 'block !important', padding: '8px !important',
                }}
              >
                <Typography textAlign="center">
                  <Link to="/usersprofile">Profile</Link>
                </Typography>
              </MenuItem>
              {loggedIn ? (
                <MenuItem
                  onClick={logout}
                  sx={{
                    display: 'block !important', padding: '8px !important',
                  }}
                >
                  <Typography textAlign="center">
                    Logout
                  </Typography>
                </MenuItem>
              ) : (
                <MenuItem sx={{
                  display: 'block !important', padding: '8px !important',
                }}
                >
                  <Typography textAlign="center">
                    <Link to="/login">
                      Login

                    </Link>
                  </Typography>
                </MenuItem>
              )}
            </Menu>
            <ModeToggle setMode={setMode} setJoyMode={setJoyMode} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
