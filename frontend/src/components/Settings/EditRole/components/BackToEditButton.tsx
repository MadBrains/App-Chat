import React from 'react';
import { Button } from 'src/ui/Button/Button';
import PrevArrowIcon from 'src/assets/icons/arrow/PrevArrowIcon';

interface BackToEditButtonProps {
  onClick?: () => void;
}

const BackToEditButtonSx = {
  fontSize: 14,
  lineHeight: '18px',
  fontWeight: 400,
  padding: 1,
  width: 'max-content',
  borderRadius: 'initial'
};

const BackToEditButton: React.FC<BackToEditButtonProps> = ({ onClick }) => {
  return (
    <Button sx={BackToEditButtonSx} onClick={onClick} startIcon={<PrevArrowIcon />}>
      Назад
    </Button>
  );
};

export default BackToEditButton;
