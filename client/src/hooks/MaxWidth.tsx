import { styled } from '@mui/system';

const MaxWidthDiv = styled('div')(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('lg')]: {
    maxWidth: '2000px',
    margin: '0 auto',
  },
}));

export default MaxWidthDiv;
