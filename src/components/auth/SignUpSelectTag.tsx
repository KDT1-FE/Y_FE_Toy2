import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

interface SignUpSelectTagProps {
  name: string;
  tag: string;
  handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  isClicked: boolean;
}

function SignUpSelectTag({ name, tag, handleClick, isClicked = false }: SignUpSelectTagProps) {
  return (
    <Grid
      item
      xs={4}
      onClick={handleClick}
      sx={{
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          backgroundColor: isClicked ? '#A8DADC' : '#F5F5F5',
          p: 2,
          borderRadius: 2,
          transition: '.3s background-color',
        }}
      >
        <Typography variant="body1">#{tag}</Typography>
        <Typography variant="body2" sx={{ color: 'gray' }}>
          {name}
        </Typography>
      </Box>
    </Grid>
  );
}

export default SignUpSelectTag;
