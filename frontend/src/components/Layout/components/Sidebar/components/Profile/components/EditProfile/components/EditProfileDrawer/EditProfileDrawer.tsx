import React, { useState } from 'react';
import EditEmail from 'src/components/Layout/components/Sidebar/components/Profile/components/EditProfile/components/EditEmail';
import EditPassword from 'src/components/Layout/components/Sidebar/components/Profile/components/EditProfile/components/EditPassword';
import ChangePhoneNumber from 'src/components/Layout/components/Sidebar/components/Profile/components/EditProfile/components/ChangePhoneNumber/ChangePhoneNumber';
import DialogDrawer from 'src/ui/Drawer/DialogDrawer';
import { UserData } from 'src/api/user/user';
import { EnumDrawer } from 'src/components/Layout/components/Sidebar/components/Profile/components/EditProfile/types';
import settingsListTable from 'src/components/Settings/components/SettingsListTable/SettingsListTable';

interface EditProfileDrawerProps {
  typeDrawer: null | EnumDrawer;
  closeDrawer: () => void;
  profile?: UserData;
}

const drawerTitles = {
  [EnumDrawer.emailDrawer]: 'Изменить e-mail',
  [EnumDrawer.passwordDrawer]: 'Изменение пароля',
  [EnumDrawer.phoneDrawer]: 'Изменить номер телефона'
};

const EditProfileDrawer: React.FC<EditProfileDrawerProps> = ({
  typeDrawer,
  closeDrawer,
  profile
}) => {
  const [description, setDescription] = useState<string | undefined>();

  const setEditDrawerDescription = (desc?: string) => setDescription(desc);

  return (
    <DialogDrawer
      open={!!typeDrawer}
      onClose={closeDrawer}
      title={typeDrawer ? drawerTitles[typeDrawer] : ''}
      description={description}
    >
      {typeDrawer === EnumDrawer.emailDrawer && <EditEmail email={profile?.email} />}
      {typeDrawer === EnumDrawer.passwordDrawer && <EditPassword close={closeDrawer} />}
      {typeDrawer === EnumDrawer.phoneDrawer && (
        <ChangePhoneNumber
          setDrawerDescription={setEditDrawerDescription}
          phoneNumber={profile?.phone}
        />
      )}
    </DialogDrawer>
  );
};

export default EditProfileDrawer;
