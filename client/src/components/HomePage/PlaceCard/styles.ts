import Card from '@mui/joy/Card';
import styled from 'styled-components';
import { blueGrey } from '@mui/material/colors';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/material/Divider';

const PlaceCard1 = styled(Card)({
  width: '20vw',
  height: '100%',
  margin: '10px',
  boxShadow: '0px 0px 25px  rgba(37, 37, 37, 0.6)',
  alignContent: 'center',
  backgroundColor: '#f5f5f5',
});

const StyledBigTypog = styled(Typography)({
  mt: 2,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  '-webkit-line-clamp': 2,
  '-webkit-box-orient': 'vertical',

});

const StyledDivider = styled(Divider)({
  width: '100%',
  color: blueGrey[100],
});
export { PlaceCard1, StyledBigTypog, StyledDivider };
