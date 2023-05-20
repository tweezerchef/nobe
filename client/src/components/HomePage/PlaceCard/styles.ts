import Card from '@mui/joy/Card';
import styled from 'styled-components';
import { blueGrey } from '@mui/material/colors';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/material/Divider';

const PlaceCard1 = styled(Card)({
  width: '20vw',
  height: '100%',
  margin: '10px',
  backgroundColor: blueGrey[50],
  boxShadow: '0px 0px 25px  rgba(37, 37, 37, 0.6)',
  alignContent: 'center',
});

const StyledBigTypog = styled(Typography)({
  fontSize: '1.5rem',
  mt: 2,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '100%',

});

const StyledDivider = styled(Divider)({
  width: '100%',
  color: blueGrey[100],
});
export { PlaceCard1, StyledBigTypog, StyledDivider };
