import styled from 'styled-components';
import { blueGrey } from '@mui/material/colors';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

const StyledDivider = styled(Divider)({
  width: '100%',
  color: blueGrey[100],
});

const FlameStyledChip = styled(Chip)({
  backgroundImage: 'url("https://i.imgur.com/N9ZrzL0.jpg")',
});

export { StyledDivider, FlameStyledChip };
