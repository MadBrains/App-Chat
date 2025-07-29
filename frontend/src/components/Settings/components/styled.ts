import { styled } from '@mui/material/styles';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';

export const TabsListSetting = styled(TabsListUnstyled)(({ theme }) => ({
  backgroundColor: `${theme.palette.input.light}`,
  borderRadius: '100px',
  display: 'inline-flex',
  alignItems: 'center',
  marginTop: '57px',
  marginBottom: '52px'
}));

export const TabSetting = styled(TabUnstyled)(
  ({ theme }) => `
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  background-color: ${theme.palette.input.light};
  border: none;
  border-radius: 33px;
  padding: 6px 40px;
  margin: 2px 2px;
  display: flex;
  color: #939393;
  
  &.${tabUnstyledClasses.selected} {
    background-color: white;
    color:black
   
  }
  
  & .chat-amount {
    color: #A5A5A;
   }
`
);
