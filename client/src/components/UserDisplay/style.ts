import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styled from 'styled-components';

const ProfileCard = styled(Card)({
  display: 'flex',
  width: '100%',
  height: 175,
  margin: '0 auto',
  boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.6)',
  alignItems: 'center',
});

const ProfileImage = styled(CardMedia)({
  width: 200,
  height: 200,
});

const ProfileInfo = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
});

const Name = styled(Typography)({
  color: '#212121',
  fontWeight: 'bold',
  fontSize: '24px',
});

const Desc = styled(Typography)({
  color: '#666666',
  fontSize: '18px',
});

const Status = styled('ul')({
  display: 'flex',
  justifyContent: 'space-between',
  listStyle: 'none',
  textAlign: 'center',
  lineHeight: '1rem',
  marginBottom: '1.3rem',
});

const StatusItem = styled.li`
  margin-right: 1rem;
`;

const StatusValue = styled(Typography)({
  color: '#212121',
  fontWeight: 'bold',
});

const StatusText = styled(Typography)({
  fontSize: '14px',
  color: '#7c7c7d',
});

const Action = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

const FollowButton = styled(Button)({
  backgroundColor: '#1976d2',
  color: 'white',
  borderRadius: '0.35rem',
  fontWeight: 'bold',
  padding: '0.8em 1.9em',
  cursor: 'pointer',
  marginRight: '10px',
});

const MessageButton = styled(Button)({
  backgroundColor: '#1976d2',
  color: 'white',
  borderRadius: '0.35rem',
  fontWeight: 'bold',
  padding: '0.8em 1.9em',
  cursor: 'pointer',
  marginRight: '10px',
});

export {
  ProfileCard, MessageButton, FollowButton, Action, StatusText, StatusValue, Status,
  Name, Desc, ProfileInfo, ProfileImage, StatusItem,
};
