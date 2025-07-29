import { styled } from '@mui/material/styles';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';

export const TabPanel = styled(TabPanelUnstyled)({
  width: '100%',
  paddingTop: '10px'
});

export const TabsList = styled(TabsListUnstyled)({
  backgroundColor: 'inherit',
  borderRadius: '12px',
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center'
});

export const Tab = styled(TabUnstyled)(
  ({ theme }) => `
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  background-color: ${theme.palette.secondary.dark};
  border: none;
  border-radius: 33px;
  padding: 4px 10px;
  margin: 6px 6px;
  display: flex;
  color: ${theme.palette.primary.main};
  
  &.${tabUnstyledClasses.selected} {
    background-color: ${theme.palette.primary.main};
    color: ${theme.palette.getContrastText(theme.palette.primary.main)};
  }
  
  & .chat-amount {
    color: #A5A5A;
   }
`
);

export const UserContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '335px',
  marginBottom: '8px',
  '.controlButton': {
    opacity: 0
  },
  '&:hover': {
    cursor: 'pointer'
  },
  '&:hover .controlButton': {
    opacity: 1
  }
});
