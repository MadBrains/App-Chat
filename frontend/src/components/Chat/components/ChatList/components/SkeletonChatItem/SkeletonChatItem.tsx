import React from 'react';
import { Skeleton, Stack } from '@mui/material';

const SkeletonChatItem: React.FC = () => (
  <Stack direction='row' spacing={1}>
    <Skeleton variant='circular' width={53} height={53} />
    <Stack spacing={1} pr={4} justifyContent='center'>
      <Skeleton variant='rectangular' width={210} height={15} />
      <Skeleton variant='rectangular' width={210} height={15} />
    </Stack>
  </Stack>
);

export default SkeletonChatItem;
