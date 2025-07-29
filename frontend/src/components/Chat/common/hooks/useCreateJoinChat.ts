import { createChat } from 'src/api/chat';
import { EnumChatType, EnumChatPermissions } from 'src/api/chat/types';
import { addChatRoom } from 'src/redux/slices/chat/chatSlice';
import { EnumRoutes } from 'src/config/routes';
import { toastAlert } from 'src/ui/Alert/toastify';
import { useRouter } from 'next/router';
import { useDispatch } from 'src/redux/store';

export const useCreateJoinChat = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCreatePrivateChat = (id?: number) => {
    return createChat({
      chat_type: EnumChatType.PRIVATE,
      chat_permission_list: [EnumChatPermissions.THREAD_ENABLED],
      members: [{ user_id: id, is_admin: false }]
    })
      .then(res => {
        dispatch(addChatRoom(res));
        router.push(`${EnumRoutes.chat}?chatId=${res.id}`);
      })
      .catch(e => {
        if (e.response.status === 303) {
          router.push(`${EnumRoutes.chat}?chatId=${e.response.data}`);
        } else {
          console.log(e);
          toastAlert('Что то пошло не так', true);
        }
      });
  };

  return { handleCreatePrivateChat };
};
