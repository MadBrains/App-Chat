import React from 'react';
import { Typography } from 'src/ui/Typography/Typography';
import { Box } from '@mui/material';

const NothingFound: React.FC = () => (
  <Box py={20} display='flex' alignItems='center' justifyContent='center'>
    <Typography
      component='p'
      textAlign='center'
      variant='h1'
      letterSpacing='-0.05em'
      sx={{ maxWidth: 625 }}
    >
      По вашему запросу ничего не найдено
    </Typography>
  </Box>
);

export default NothingFound;
