import React, {useRef, useState } from 'react';
import { ButtonBase, Menu, MenuItem, Stack } from '@mui/material';
import ArrowDownIcon from 'src/assets/icons/arrow/ArrowDownIcon';
import { Typography } from 'src/ui/Typography/Typography';

interface SortSelectProps {
  initialState?: string;
  options: { label?: string; value: string }[];
  onSelect: (value: string) => void;
}

const SortSelect: React.FC<SortSelectProps> = ({ onSelect, options, initialState }) => {
  const [value, setValue] = useState(initialState || options?.[0]?.value);
  const anchorEl = useRef(null);
  const [isOpen,setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = (value: string) => {
    setValue(value);
    onSelect(value);
    setOpen(false);
  };

  return (
    <>
      <Stack spacing={0.5} direction='row' alignItems='center' onClick={handleClick} sx={{cursor: 'pointer'}}>
        <Typography component='span' variant='body2'>
          Показывать по
        </Typography>
        <ButtonBase
          aria-controls={isOpen ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={isOpen ? 'true' : undefined}
        >
          <Typography component='span' variant='body2' sx={{ textDecoration: 'underline', mr: 1 }} ref={anchorEl}>
            {value}
          </Typography>
          <ArrowDownIcon transform={isOpen ? "rotate(180)" : "rotate(360)"} />
        </ButtonBase>
      </Stack>
      <Menu
        anchorEl={anchorEl.current}
        open={isOpen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        transformOrigin={{vertical: 'top', horizontal: 'center'}}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      >
        {options.map(option => (
          <MenuItem key={option.value} onClick={() => handleSelect(option.value)}>{option?.label || option.value}</MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SortSelect;
