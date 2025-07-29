import { styled } from '@mui/material/styles';

export const PopupHeader = styled('div')(() => ({
  display: 'flex',
  paddingRight: '40px',
  paddingTop: '15px',
  paddingBottom: '15px',
  alignItems: 'center',
  justifyContent: 'flex-end',
  borderBottom: '1px solid #D9D9D9'
}));

export const closePopupSx = {
  fontSize: 14,
  lineHeight: '18px',
  padding: 1,
  width: 80,
  borderRadius: 'initial'
};
