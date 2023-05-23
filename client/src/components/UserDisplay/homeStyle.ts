import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styled from 'styled-components';

const ProfileCard = styled(Card)({
  display: 'flex !important',
  width: '100% !important',
  height: '100% !important',
  margin: '0 auto !important',
  justifyContent: 'center !important',
  alignItems: 'center !important',
  boxShadow: 'none !important', // Remove box-shadow
  border: 'none !important', // Remove border
  outline: 'none !important', // Remove out1line
  backgroundColor: 'transparent !important',
});

const ProfileImage = styled(CardMedia)({
  width: 200,
  height: 200,
});

const ProfileInfo = styled(CardContent)({

  alignItems: 'center',
  textAlign: 'center',
});

const Name = styled(Typography)({
  // color: '#212121',
  fontWeight: 'bold !important',
  fontSize: '16px !important',
});

const Desc = styled(Typography)({
  // color: '#666666',
  fontSize: '14px !important',
});

const Status = styled('ul')({
  justifyContent: 'space-between !important',
  maxWidth: '100% !important',
  textAlign: 'center',
});

const StatusItem = styled.li`
`;

const StatusValue = styled(Typography)({
  // color: '#212121',
  // fontWeight: 'bold !important',
});

const StatusText = styled(Typography)({
  // fontSize: '12px !important',
  // color: '#7c7c7d',
});

const Action = styled('div')({
  display: 'flex !important',
  justifyContent: 'space-between !important',
});

export {
  ProfileCard, Action, StatusText, StatusValue, Status,
  Name, Desc, ProfileInfo, ProfileImage, StatusItem,
};
