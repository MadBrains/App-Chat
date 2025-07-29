import React from 'react';
import { Button } from 'src/ui/Button/Button';
import DeleteIcon from 'src/assets/icons/action/DeleteIcon';

interface DeleteRoleButtonProps {
  onClick?: () => void;
}

const deleteRoleButtonSx = {
  fontSize: 14,
  lineHeight: '18px',
  fontWeight: 400,
  padding: 1,
  width: 'max-content',
  borderRadius: 'initial'
};

const DeleteRoleButton: React.FC<DeleteRoleButtonProps> = ({ onClick }) => {
  return (
    <Button sx={deleteRoleButtonSx} onClick={onClick} endIcon={<DeleteIcon />}>
      Удалить
    </Button>
  );
};

export default DeleteRoleButton;
