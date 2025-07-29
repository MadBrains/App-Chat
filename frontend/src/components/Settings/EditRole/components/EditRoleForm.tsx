import React, { useState } from 'react';
import DialogDrawer from 'src/ui/Drawer/DialogDrawer';
import EditRightsButton from 'src/components/Settings/EditRole/components/EditRightsButton';
import { Button } from 'src/ui/Button/Button';
import { EnumRights, titles } from 'src/components/Settings/EditRole/types';
import { clientRights, generalRights, staffRights } from 'src/components/Settings/EditRole/_mocks';
import SwitchWithLabel from 'src/components/Settings/EditRole/components/SwitchWithLabel';
import { Stack } from '@mui/material';
import DeleteRoleButton from 'src/components/Settings/EditRole/components/DeleteRoleButton';
import BackToEditButton from 'src/components/Settings/EditRole/components/BackToEditButton';
import { EditRoleInput } from 'src/components/Settings/EditRole/rightsButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MockSettingsTableRows } from 'src/components/Settings/components/SettingsListTable/_mock';

interface EditRoleProps {
  isOpen?: boolean;
  onClose?: () => void;
  selectedRole?: MockSettingsTableRows | null;
}

interface EditRoleForm {
  id: number;
  status: string;
  description?: string;
  staffRights?: {
    [key: string]: boolean;
  };
  generalRights?: {
    [key: string]: boolean;
  };
  clientsRights?: {
    [key: string]: boolean;
  };
}

export const EditRoleForm: React.FC<EditRoleProps> = ({ isOpen, onClose, selectedRole }) => {
  const [selectedDrawer, setSelectedDrawer] = useState<null | EnumRights>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<EditRoleForm>();
  const values = getValues();

  const handleSelectDrawer = (rightType: EnumRights) => setSelectedDrawer(rightType);
  const onSubmit: SubmitHandler<EditRoleForm> = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EditRoleInput label='ID' defaultValue={selectedRole?.id} register={{ ...register('id') }} />
      <EditRoleInput
        label='Статус'
        defaultValue={selectedRole?.name}
        register={{ ...register('status') }}
      />
      <EditRoleInput
        label='Описание'
        defaultValue={selectedRole?.description}
        register={{ ...register('description') }}
      />
      <EditRightsButton
        rightType={EnumRights.GENERAL_RIGHTS}
        onClick={handleSelectDrawer}
        title='Общие права работы в системе'
      />
      <EditRightsButton
        rightType={EnumRights.CLIENTS_RIGHTS}
        onClick={handleSelectDrawer}
        title='Права по сотрудникам'
      />
      <EditRightsButton
        rightType={EnumRights.STAFF_RIGHTS}
        onClick={handleSelectDrawer}
        title='Права по клиентам'
      />
      <Button fullWidth variant='contained' type='submit'>
        Сохранить
      </Button>
      <DialogDrawer
        title={selectedDrawer ? titles[selectedDrawer] : ''}
        titleVariant='subtitle1'
        open={!!selectedDrawer}
        onClose={() => setSelectedDrawer(null)}
        additionalButton={<BackToEditButton onClick={() => setSelectedDrawer(null)} />}
      >
        <Stack direction='column' spacing={3}>
          {selectedDrawer === EnumRights.CLIENTS_RIGHTS &&
            clientRights.map(right => (
              <SwitchWithLabel
                key={right.label}
                label={right.label}
                defaultChecked={values?.clientsRights && values.clientsRights[right.label]}
                register={{ ...register(`clientsRights.${right.label}`) }}
              />
            ))}
          {selectedDrawer === EnumRights.GENERAL_RIGHTS &&
            generalRights.map(right => (
              <SwitchWithLabel
                key={right.label}
                label={right.label}
                defaultChecked={values?.generalRights && values.generalRights[right.label]}
                register={{ ...register(`generalRights.${right.label}`) }}
              />
            ))}
          {selectedDrawer === EnumRights.STAFF_RIGHTS &&
            staffRights.map(right => (
              <SwitchWithLabel
                key={right.label}
                label={right.label}
                defaultChecked={values?.staffRights && values.staffRights[right.label]}
                register={{ ...register(`staffRights.${right.label}`) }}
              />
            ))}
        </Stack>
      </DialogDrawer>
    </form>
  );
};

export default EditRoleForm;
