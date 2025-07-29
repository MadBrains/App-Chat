import React, { ReactElement } from 'react';
import { Menu as MuiMenu } from '@mui/material';
import {
  arrowDropDownProps,
  dropDownAnchorOrigin,
  dropDownTransformOrigin
} from 'src/ui/DropDownTemplate/styled';
import { styled } from '@mui/material/styles';

interface DropDownChildrenProps {
  isOpenDropDown: boolean;
  onClickDropDown: (event: React.MouseEvent<HTMLElement>) => void;
  onCloseDropDown: () => void;
}

interface DropDownProps {
  renderButton: (props: DropDownChildrenProps) => ReactElement;
  children: (props: DropDownChildrenProps) => ReactElement | Array<ReactElement>;
  hasArrow?: boolean;
}

const Menu = styled(MuiMenu)(({ theme }) => ({
  padding: 0,
  '.MuiMenu-list': {
    padding: 0,
    backgroundColor: theme.palette.info.main,
    borderRadius: '16px',
    overflow: 'hidden'
  }
}));

const DropDownTemplate: React.FC<DropDownProps> = ({ renderButton, hasArrow, children }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isOpenDropDown = Boolean(anchorEl);

  const onClickDropDown = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onCloseDropDown = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {renderButton({ isOpenDropDown, onCloseDropDown, onClickDropDown })}
      <Menu
        MenuListProps={{
          'aria-labelledby': 'long-button'
        }}
        anchorEl={anchorEl}
        open={isOpenDropDown}
        PaperProps={hasArrow ? arrowDropDownProps : {}}
        transformOrigin={dropDownTransformOrigin}
        anchorOrigin={dropDownAnchorOrigin}
        onClose={onCloseDropDown}
      >
        {children({ onCloseDropDown, onClickDropDown, isOpenDropDown })}
      </Menu>
    </>
  );
};

export default DropDownTemplate;
