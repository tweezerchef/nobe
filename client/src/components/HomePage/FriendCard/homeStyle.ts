import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styled from 'styled-components';

const ProfileCard = styled(Card)({
  width: '20vw',
  height: '25vh',
  margin: '10px',
  boxShadow: '0px 0px 25px  rgba(37, 37, 37, 0.6)',
  alignContent: 'center',
  justifyContent: 'center',
  justifyItems: 'center',
  backgroundColor: '#f5f5f5',
});

const AvatarWrapper = styled('div')({
  marginTop: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
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
  alignContent: 'start',
  textAlign: 'center',
});

const Name = styled(Typography)({
  // color: '#212121',
  fontWeight: 'bold',
  fontSize: '24px',
});

const Desc = styled(Typography)({
  // color: '#666666',
  fontSize: '18px',
});

const Status = styled('ul')({
  display: 'flex',
  justifyContent: 'space-between',
  maxWidth: '100%',
  listStyle: 'none',
  textAlign: 'center',
  lineHeight: '1rem',
});

const StatusItem = styled.li`
  margin-right: 1rem;
`;

const StatusValue = styled(Typography)({
  // color: '#212121',
  fontWeight: 'bold',
});

const StatusText = styled(Typography)({
  fontSize: '14px',
  // color: '#7c7c7d',
});

const Action = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

export {
  ProfileCard, Action, StatusText, StatusValue, Status,
  Name, Desc, ProfileInfo, ProfileImage, StatusItem, AvatarWrapper,
};
