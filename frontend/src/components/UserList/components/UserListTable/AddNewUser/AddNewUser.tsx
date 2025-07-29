import React, { useState } from 'react';
import AddPlusIcon from 'src/assets/icons/action/AddPlusIcon';
import { Typography } from 'src/ui/Typography/Typography';
import { ButtonBase } from '@mui/material';
import UserFormDrawer from 'src/components/UserList/components/UserListTable/AddNewUser/components/UserFormDrawer';

interface AddNewUser {
  isEmployersPage: boolean;
}

const AddNewUser: React.FC<AddNewUser> = ({ isEmployersPage }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <ButtonBase sx={{ height: 'min-content' }} onClick={() => setOpen(true)}>
        <Typography component='span' variant='body2' sx={{ mr: 1 }}>
          Новый {isEmployersPage ? 'сотрудник' : 'клиент'}
        </Typography>
        <AddPlusIcon />
      </ButtonBase>
      <UserFormDrawer isOpen={isOpen} onClose={() => setOpen(false)} />
    </>
  );
};

export default AddNewUser;
