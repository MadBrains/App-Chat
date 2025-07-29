import React, { useMemo, useState } from 'react';
import {
  CloseIcon,
  CreateGroupSubTitle,
  CreateGroupTitle,
  groupTitleSx,
  InviteToChatIcon,
  MainButtonsSx,
  modalContentSx,
  PermissionTitle
} from 'src/components/Chat/components/CreateChat/styled';
import { Input, Stack } from '@mui/material';
import Avatar from 'src/components/common/Avatar/Avatar';
import TextInput from 'src/ui/TextInput/TextInput';
import CreateChatSwitch from 'src/components/Chat/components/CreateChat/components/CreateChatSwitch';
import { Button } from 'src/ui/Button/Button';
import { Box } from 'src/ui/Box/Box';
import {
  CreateChatForm,
  descriptionFieldSx
} from 'src/components/Chat/components/CreateChat/ConfigurationModalContent';
import { ChatType, TranslatedPermission } from 'src/api/chat/types';
import { FormState, UseFormGetValues, UseFormRegister, UseFormSetError } from 'react-hook-form';
import { UseFormClearErrors } from 'react-hook-form/dist/types/form';
import SvgCheck from 'src/assets/icons/Check';
import SvgAddUsersIcon from 'src/assets/icons/chat/AddUsersIcon';
import SvgCloseInviteChatIcon from 'src/assets/icons/chat/CloseInviteChatIcon';
import { useSelector } from 'src/redux/store';
import { shallowEqual } from 'react-redux';

interface ChatSettingsProps {
  chatId?: number;
  register: UseFormRegister<CreateChatForm>;
  errors: FormState<CreateChatForm>['errors'];
  permissionList?: ChatType;
  translatedPermissionList?: TranslatedPermission;
  handleClose: () => void;
  getValues: UseFormGetValues<CreateChatForm>;
  setOpenInvitation: (open: boolean) => void;
  setError: UseFormSetError<CreateChatForm>;
  isEdit?: boolean;
  handleSubmit: () => void;
  title?: string;
  description?: string;
  clearErrors?: UseFormClearErrors<CreateChatForm>;
}

const ChatSettings: React.FC<ChatSettingsProps> = ({
  chatId,
  getValues,
  permissionList,
  setError,
  errors,
  setOpenInvitation,
  register,
  handleClose,
  isEdit,
  handleSubmit,
  title,
  description,
  clearErrors,
  translatedPermissionList
}) => {
  const [name, setName] = useState<string | undefined>(title);
  const chatList = useSelector(state => state.chat.chatList, shallowEqual);
  const selectedChat = useMemo(
    () => chatList?.find(chat => chat.id === chatId),
    [chatId, chatList]
  );
  const handleConfigurationButton = () => {
    isEdit ? handleSubmit() : setOpenInvitation(true);
  };
  const editName = (e: string) => {
    clearErrors && clearErrors('chat_name');
    setName(e);
  };

  return (
    <Box sx={modalContentSx}>
      <Stack spacing={2}>
        <CreateGroupTitle>{isEdit ? 'Настройка группы' : 'Создание новой группы'}</CreateGroupTitle>
        <Stack direction='row' spacing={3} alignItems='center'>
          <Avatar size={92} alt='Chat avatar' />
          <Stack spacing={1}>
            <CreateGroupSubTitle>Название группы</CreateGroupSubTitle>
            <Input
              {...register('chat_name', { required: true })}
              error={!!errors?.chat_name}
              defaultValue={title}
              sx={groupTitleSx}
              onChange={e => editName(e.currentTarget.value)}
            />
          </Stack>
        </Stack>
        <TextInput
          placeholder={`Описание\n (необязательно)`}
          minRows={2}
          maxRows={4}
          sx={descriptionFieldSx}
          multiline
          defaultValue={description}
          register={register('description')}
        />
        <PermissionTitle>Возможности участников</PermissionTitle>
        <Stack spacing={1} px={2}>
          {permissionList?.available_permissions?.map((permission, index) => (
            <CreateChatSwitch
              key={index}
              label={translatedPermissionList ? translatedPermissionList[permission] : ''}
              register={register(`permissions.${permission}`)}
              active={
                selectedChat
                  ? !!selectedChat?.chat_permission_list?.find(item => item === permission)
                  : !!permissionList?.default_permissions?.find(item => item === permission)
              }
            />
          ))}
        </Stack>
      </Stack>
      <Stack direction='row' justifyContent='space-between' mt='auto'>
        <Button variant='text' size='small' onClick={handleClose} sx={MainButtonsSx}>
          <CloseIcon>
            <SvgCloseInviteChatIcon />
          </CloseIcon>
          {isEdit ? 'Закрыть' : 'Отмена'}
        </Button>
        <Button
          disabled={!name}
          variant='text'
          size='small'
          sx={MainButtonsSx}
          onClick={() => {
            getValues('chat_name')
              ? handleConfigurationButton()
              : setError('chat_name', { type: 'custom' });
          }}
        >
          {isEdit ? (
            <>
              <SvgCheck viewBox={'0 0 24 24'} height={16} width={22} />
              Сохранить изменения
            </>
          ) : (
            <>
              <InviteToChatIcon>
                <SvgAddUsersIcon />
              </InviteToChatIcon>
              Пригласить в чат
            </>
          )}
        </Button>
      </Stack>
    </Box>
  );
};

export default ChatSettings;
