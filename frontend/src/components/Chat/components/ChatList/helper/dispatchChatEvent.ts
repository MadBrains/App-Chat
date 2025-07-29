import {
  addChatRoom,
  chatAddMembers,
  chatRemoveMembers,
  editChatRoom,
  removeChatRoom
} from 'src/redux/slices/chat/chatSlice';
import { EnumRoutes } from 'src/config/routes';
import { ChatWithMember } from 'src/api/chat/types';
import { TypedDispatch } from 'src/redux/store';
import { NextRouter } from 'next/router';

enum EnumChatRoomEvent {
  DELETE = 'DELETE',
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  MEMBER_REMOVE = 'MEMBER_REMOVE',
  MEMBERS_ADD = 'MEMBERS_ADD'
}

interface ChatRoomsUpdate {
  event: EnumChatRoomEvent;
  chat: ChatWithMember;
}

interface ChatEventParams {
  dispatch: TypedDispatch;
  router: NextRouter;
  chatId: string | null;
  userId: number;
}

export const dispatchChatEvent = (
  message: string,
  { dispatch, chatId, router, userId }: ChatEventParams
) => {
  const chatData: ChatRoomsUpdate = JSON.parse(message);

  if (chatData.event === EnumChatRoomEvent.CREATE) {
    return dispatch(addChatRoom(chatData.chat));
  }

  if (chatData.event === EnumChatRoomEvent.DELETE && chatData.chat.id) {
    return dispatch(removeChatRoom(chatData.chat.id));
  }

  if (chatData.event === EnumChatRoomEvent.EDIT) {
    return dispatch(editChatRoom(chatData.chat));
  }

  if (chatData.event === EnumChatRoomEvent.MEMBERS_ADD) {
    if (chatData.chat.members && chatId && parseInt(chatId) === chatData?.chat?.id) {
      return dispatch(chatAddMembers(chatData.chat.members));
    }
    if (chatData.chat.id) {
      return dispatch(addChatRoom(chatData.chat));
    }
  }
  if (chatData.event === EnumChatRoomEvent.MEMBER_REMOVE && chatData.chat.members) {
    if (
      !!chatData.chat.members.find(removedMembers => removedMembers.user_id === userId) &&
      chatData.chat.id
    ) {
      if (chatId && parseInt(chatId) === chatData?.chat?.id) {
        router.push(EnumRoutes.chat);
      }

      return dispatch(removeChatRoom(chatData.chat.id));
    }
    if (chatId && parseInt(chatId) === chatData?.chat?.id) {
      dispatch(chatRemoveMembers(chatData.chat.members));
    }
  }
};
