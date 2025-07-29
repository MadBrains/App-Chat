import React, { useState } from 'react';
import DialogDrawer from 'src/ui/Drawer/DialogDrawer';
import { EnumShowMoreControls } from 'src/components/UserList/components/UserListTable/ShowMoreMenu/constants';
import EditUserForm from 'src/components/UserList/components/UserListTable/ShowMoreMenu/components/EditUserForm';
import ConfirmDrawer from 'src/ui/Drawer/ConfirmDrawer';
import {
  EditWorkerParam,
  SelectedUserControl
} from 'src/components/UserList/components/UserListTable/UserListTable';
import { UserData } from 'src/api/user/user';

interface EditUserFormContainerProps {
  selectedUserData: SelectedUserControl;
  setSelectedUserData: (
    value: (prev: SelectedUserControl) => {
      userData: UserData | null;
      modalType: EnumShowMoreControls | null;
    }
  ) => void;
  setEditUser: (value: EditWorkerParam) => void;
}

const EditUserFormContainer: React.FC<EditUserFormContainerProps> = ({
  selectedUserData,
  setSelectedUserData,
  setEditUser
}) => {
  const [isDirty, setIsDirty] = useState(false);
  const [isOpenConfirmDialog, setOpenConfirmDialog] = useState(false);
  const CloseEditForm = () => {
    if (isDirty) {
      setOpenConfirmDialog(true);
    } else {
      handleClose();
    }
  };

  const handleCancelChange = () => {
    setOpenConfirmDialog(false);
    handleClose();
  };

  const handleClose = () => {
    setSelectedUserData((prev: SelectedUserControl) => ({ ...prev, modalType: null }));
  };

  return (
    <DialogDrawer
      open={selectedUserData.modalType === EnumShowMoreControls.edit}
      title='Редактирование'
      onClose={CloseEditForm}
    >
      <EditUserForm
        handleOpenBlocking={() =>
          setSelectedUserData((prev: SelectedUserControl) => ({
            ...prev,
            modalType: EnumShowMoreControls.blocked
          }))
        }
        isBlockedUser={false}
        selectedUserData={selectedUserData.userData}
        setIsDirty={setIsDirty}
        onClose={handleClose}
        setEditUser={setEditUser}
      />
      <ConfirmDrawer
        open={isOpenConfirmDialog}
        title='Вы уверены, что хотите выйти?'
        description='Ваши данные не сохранятся'
        confirmLabel='Сбросить данные'
        onCancel={() => setOpenConfirmDialog(false)}
        onConfirm={handleCancelChange}
      />
    </DialogDrawer>
  );
};

export default EditUserFormContainer;
