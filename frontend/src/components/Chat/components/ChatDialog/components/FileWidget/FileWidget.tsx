import React from 'react';
import { styled } from '@mui/material/styles';
import PdfIcon from 'src/assets/icons/fileWidget/PdfIcon';
import { IconButton } from 'src/ui/IconButton/IconButton';
import DownloadFileIcon from 'src/assets/icons/fileWidget/DownloadFileIcon';
import { Typography } from 'src/ui/Typography/Typography';
import { Stack } from '@mui/material';

interface FileWidgetProps {
  name: string;
  size: string;
}

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px',
  maxWidth: '250px',
  border: `1px solid ${theme.palette.info.main}`,
  borderRadius: '12px'
}));

const FileWidget: React.FC<FileWidgetProps> = ({ name, size }) => {
  return (
    <Container>
      <Stack direction='row' spacing={2}>
        <PdfIcon />
        <Stack justifyContent='space-between'>
          <Typography variant='body1' component='span'>
            {name}
          </Typography>
          <Typography variant='body1' component='span' color='secondary'>
            {size}
          </Typography>
        </Stack>
      </Stack>
      <IconButton>
        <DownloadFileIcon />
      </IconButton>
    </Container>
  );
};

export default FileWidget;
