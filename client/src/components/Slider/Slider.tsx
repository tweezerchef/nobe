import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export interface SlideProps extends React.ChildrenProps {

fill: null,
}

 function SliderSizes({ children }: SlideProps) {

  return (
    <Box width={300}>
      <Slider
        size="small"
        defaultValue={0}
        aria-label="Small"
        valueLabelDisplay="auto"
      />
      <Slider defaultValue={0} aria-label="Default" valueLabelDisplay="auto" />
    </Box>
  );
}


export default SliderSizes;