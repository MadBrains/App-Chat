import React, { useEffect, useState } from 'react';
import InvitationMembers from 'src/components/Chat/components/CreateChat/components/InvitationMembers';
import { modalCreateChatSx } from 'src/components/Chat/components/CreateChat/styled';
import { Box } from 'src/ui/Box/Box';
import { useForm } from 'react-hook-form';
import { createChat, editChat, getChatPermissions, getPermissionsTranslate } from 'src/api/chat';
import {
  ChatType,
  EnumActionWithChat,
  EnumChatType,
  TranslatedPermissionEnum,
  TranslatedPermission
} from 'src/api/chat/types';
import { toastAlert } from 'src/ui/Alert/toastify';
import { useRouter } from 'next/router';
import { EnumRoutes } from 'src/config/routes';
import ChatSettings from 'src/components/Chat/components/CreateChat/components/ChatSettings';
import { useDispatch } from 'src/redux/store';
import { addChatRoom, editChatRoom } from 'src/redux/slices/chat/chatSlice';

export const descriptionFieldSx = {
  '& .MuiInputBase-root': {
    minHeight: 46,
    fontSize: 14,
    boxSizing: 'inherit',
    display: 'block'
  },
  '& .MuiInputBase-input': {
    borderRadius: 'none',
    textAlign: 'center'
  },
  '& .MuiFilledInput-root': {
    borderRadius: 'none',
    padding: '13px 20px'
  },
  '&.::-webkit-input-placeholder': {
    textAlign: 'center'
  },
  '&.:-ms-input-placeholder': {
    textAlign: 'center'
  }
};

interface CreateChatDrawerProps {
  handleClose: () => void;
  isEdit?: boolean;
  chatId?: number;
  title?: string;
  description?: string;
  closeModal: () => void;
}

export interface CreateChatForm {
  chat_name: string;
  description?: string;
  permissions: {
    [key: string]: string;
  };
}

const ConfigurationModalContent: React.FC<CreateChatDrawerProps> = ({
  isEdit,
  chatId,
  title,
  description,
  closeModal,
  handleClose
}) => {
  const [isOpenInvitation, setOpenInvitation] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    clearErrors
  } = useForm<CreateChatForm>();
  const dispatch = useDispatch();
  const [permissionList, setPermissionList] = useState<ChatType>();
  const [translatedPermissions, setTranslatedPermissions] = useState<TranslatedPermission>();
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getChatPermissions(EnumChatType.GROUP_CHAT).then(permissions => setPermissionList(permissions));
    getPermissionsTranslate('ru').then(permissions =>
      setTranslatedPermissions(permissions?.values)
    );
  }, []);

  const onSubmit = (data: CreateChatForm) => {
    setLoading(true);
    const chat_permission_list = permissionList?.available_permissions?.filter(
      permission => data.permissions[permission]
    );

    const submitRequest = () =>
      isEdit && chatId
        ? editChat({
            chatId: chatId,
            data: {
              chat_type: EnumChatType.GROUP_CHAT,
              chat_name: data.chat_name,
              chat_permission_list,
              description: data.description
            }
          })
        : createChat({
            chat_type: EnumChatType.GROUP_CHAT,
            chat_name: data.chat_name,
            chat_permission_list,
            description: data.description,
            members: selectedMembers.map(user_id => ({ user_id, is_admin: false }))
          });

    submitRequest()
      .then(res => {
        if (isEdit) {
          dispatch(editChatRoom(res));
        } else {
          setOpenInvitation(false);
          dispatch(addChatRoom(res));
          router.push(`${EnumRoutes.chat}?chatId=${res.id}`);
        }
        toastAlert(isEdit ? 'Чат успешно отредактирован' : 'Чат успешно создан');
        handleClose();
      })
      .catch(e => {
        console.log(e);
        toastAlert('Что то пошло не так', true);
      })
      .finally(() => setLoading(false));
  };

  const appendMember = (id: number) => setSelectedMembers(prev => [...prev, id]);

  const prependMember = (id: number) =>
    setSelectedMembers(prev => prev.filter(memberId => memberId !== id));

  return (
    <>
      <Box sx={modalCreateChatSx} component='form'>
        {!isOpenInvitation && (
          <ChatSettings
            chatId={chatId}
            register={register}
            errors={errors}
            handleClose={handleClose}
            setOpenInvitation={setOpenInvitation}
            setError={setError}
            getValues={getValues}
            permissionList={permissionList}
            isEdit={isEdit}
            title={title}
            description={description}
            handleSubmit={handleSubmit(onSubmit)}
            clearErrors={clearErrors}
            translatedPermissionList={translatedPermissions}
          />
        )}
        {isOpenInvitation && !isEdit && (
          <InvitationMembers
            handleClose={() => {
              setOpenInvitation(false);
            }}
            appendMember={appendMember}
            prependMember={prependMember}
            selectedMembers={selectedMembers}
            handleSubmit={handleSubmit(onSubmit)}
            submitText='Создать новый чат'
            closeModal={closeModal}
            action={EnumActionWithChat.CREATE_CHAT}
          />
        )}
      </Box>
    </>
  );
};

export default ConfigurationModalContent;
