import { styled } from '@mui/material/styles';

export const ModalHeader = styled('div')(() => ({
  display: 'flex',
  paddingRight: '40px',
  height: '68px',
  alignItems: 'center',
  justifyContent: 'flex-end',
  borderBottom: '1px solid #D9D9D9'
}));

export const ModalContent = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '30px',
  height: '298px'
}));

export const ModalDeleteRole = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '458px',
  backgroundColor: 'background.paper'
};
