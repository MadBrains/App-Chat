import { styled } from '@mui/material/styles';
import { IconButton as MuiIconButton } from 'src/ui/IconButton/IconButton';

export const IconContainer = styled('div')`
  min-width: 25px;
  max-width: 45px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  transition: 0.2s all linear;
  transform: rotate(180deg);
  margin-left: -15px;
`;
export const IconButton = styled(MuiIconButton)`
  min-width: 25px;
  max-width: 45px;
  width: 100%;
  height: 45px;
`;

export const AllCounterContainer = styled('div')(
  ({ theme }) => `
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  width: 29px;
  height: 15px;
  font-size: 12px;
  line-height: 12px;
  background-color: ${theme.palette.secondary.main};
  padding-top: 2px;
  letter-spacing: -0.03em;
  position: relative;
  right: 9px
`
);
