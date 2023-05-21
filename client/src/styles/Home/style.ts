import styled from 'styled-components';
import { blueGrey } from '@mui/material/colors';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/material/Divider';

const StyledDivider = styled(Divider)({
  width: '100%',
  color: blueGrey[100],
});

const FlameStyledChip = styled(Chip)({
  backgroundImage: 'url("https://i.imgur.com/N9ZrzL0.jpg")',
  width: '100%',
  color: 'black',
  size: 'lg',

});

export { StyledDivider, FlameStyledChip };
