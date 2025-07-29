import { styled, Theme } from '@mui/material/styles';

export const ChatContainer = styled('div')(
  ({ theme }) => `
  min-width: 380px;
  width: 380px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${theme.palette.secondary.light};
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  padding-bottom: 20px;
`
);

export const collapseSx = {
  position: 'absolute',
  left: 0,
  top: 65,
  bgcolor: (theme: Theme) => theme.palette.secondary.light,
  pl: '25px',
  zIndex: 10,
  right: 0
};
