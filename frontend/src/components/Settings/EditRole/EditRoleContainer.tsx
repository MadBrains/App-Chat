import React from 'react';
import DialogDrawer from 'src/ui/Drawer/DialogDrawer';
import { MockSettingsTableRows } from 'src/components/Settings/components/SettingsListTable/_mock';
import { EnumShowMoreSettingsControls } from 'src/components/Settings/components/SettingsListTable/constants';
import { SelectedSettingControl } from 'src/components/Settings/components/SettingsListTable/SettingsListTable';
import DeleteRoleButton from 'src/components/Settings/EditRole/components/DeleteRoleButton';
import EditRoleForm from 'src/components/Settings/EditRole/components/EditRoleForm';

interface EditRoleContainerProps {
  selectedSettingData: SelectedSettingControl;
  setSelectedSettingData: (
    value: (prev: SelectedSettingControl) => {
      settingData: MockSettingsTableRows | null;
      modalType: EnumShowMoreSettingsControls | null;
    }
  ) => void;
}

const EditRoleContainer: React.FC<EditRoleContainerProps> = ({
  selectedSettingData,
  setSelectedSettingData
}) => {
  const handleClose = () => {
    setSelectedSettingData(prev => ({ ...prev, modalType: null }));
  };

  return (
    <DialogDrawer
      open={selectedSettingData.modalType === EnumShowMoreSettingsControls.edit}
      onClose={handleClose}
      title='Суперадмин'
      additionalButton={<DeleteRoleButton />}
    >
      <EditRoleForm selectedRole={selectedSettingData.settingData} />
    </DialogDrawer>
  );
};

export default EditRoleContainer;
