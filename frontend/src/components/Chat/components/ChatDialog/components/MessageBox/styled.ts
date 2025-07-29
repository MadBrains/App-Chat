import { styled } from '@mui/material/styles';

interface MessageBoxProps {
  own?: boolean;
  first?: boolean;
}

export const MessageBoxContainer = styled('div')<MessageBoxProps>(({ own }) => ({
  display: 'flex',
  alignItems: 'end',
  marginBottom: '8px',
  alignSelf: own ? 'flex-end' : 'inherit',
  flexDirection: own ? 'column' : 'row',
  paddingRight: '20px',
  whiteSpace: 'pre-line'
}));

export const MessageArea = styled('div')({});
export const NameField = styled('span')(({ theme }) => ({
  fontSize: '10px',
  fontWeight: 'bold',
  color: theme.palette.input.light,
  marginLeft: '8px'
}));
export const MessageTextFieldContainer = styled('div')<MessageBoxProps>(
  ({ own, first, theme }) => ({
    fontSize: '14px',
    padding: '8px 17px',
    minHeight: '36px',
    border: '1px solid #ECEBEB',
    borderRadius: first ? '16px' : own ? '16px 16px 0 16px' : '16px 16px 16px 0',
    display: 'inline-block',
    backgroundColor: own ? theme.palette.secondary.light : '',
    marginBottom: first ? '2px' : 0,
    marginLeft: '8px',
    maxWidth: '400px',
    textAlign: own ? 'right' : 'left',
    wordBreak: 'break-all'
  })
);

export const SendingTimeField = styled('div')(({ theme }) => ({
  fontSize: '12px',
  color: theme.palette.input.light,
  marginLeft: '4px'
}));
