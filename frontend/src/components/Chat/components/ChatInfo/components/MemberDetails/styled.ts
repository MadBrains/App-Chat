import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
  padding: '16px',
  borderRadius: '8px',
  maxWidth: '300px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.secondary.light
}));

export const Name = styled('span')({
  fontWeight: '400',
  fontSize: '24px',
  lineHeight: '33px'
});

export const LocalTime = styled('span')(({ theme }) => ({
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '19px',
  color: theme.palette.info.light
}));

export const AdditionalText = styled('span')({
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '19px'
});
