import qs from 'qs';
import apiInstance from 'src/api/axios';
import {
  addChatParams,
  ArchiveChatData,
  Chat,
  ChatMember,
  ChatType,
  ChatWithMember,
  EditChatData,
  EnumChatType,
  GetChatMembersData,
  IgnoreInvocationData,
  MakeAdminChatData,
  MuteChatData,
  PageableParams,
  RemoveMemberFromChatParams,
  TranslatedPermissionEnum
} from 'src/api/chat/types';
import { AxiosRequestConfig } from 'axios';
import { toastAlert } from 'src/ui/Alert/toastify';

export const createChat = (data: Chat) =>
  apiInstance.post<Chat>('/chat', data).then(response => response.data);

export const editChat = ({ chatId, data }: EditChatData) =>
  apiInstance.patch<Chat>(`/chat/${chatId}`, data).then(response => response.data);

export const getPermissionsTranslate = (language: string) =>
  apiInstance
    .get<TranslatedPermissionEnum>('/chat/permissions/translations', {
      params: language,
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
    })
    .then(res => res.data);

export const getChats = (pagination: PageableParams, config?: AxiosRequestConfig) =>
  apiInstance
    .get<ChatWithMember[]>('/chat', {
      params: pagination,
      ...config,
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
    })
    .then(res => res.data);

export const deleteChat = (id?: number) =>
  apiInstance.delete(`/chat/${id}`).then(response => response.data);

export const muteChat = ({ chatId, mutedTo }: MuteChatData) =>
  apiInstance
    .patch(`/chat/${chatId}/mute`, null, { params: { mutedTo } })
    .then(response => response.data);

export const makeAdminChat = ({ chatId, userId, admin }: MakeAdminChatData) =>
  apiInstance
    .patch<ChatMember>(`/chat/${chatId}/members/${userId}/makeAdmin`, null, {
      params: { admin }
    })
    .then(response => response.data)
    .catch(() => toastAlert('Что-то пошло не так', true));

export const ignoreInvocation = ({ chatId, ignoreInvocation }: IgnoreInvocationData) =>
  apiInstance
    .patch(`/chat/${chatId}/ignore-invocation`, null, {
      params: { ignoreInvocation }
    })
    .then(response => response.data);

export const archiveChat = ({ chatId, archived }: ArchiveChatData) =>
  apiInstance
    .patch<ChatMember>(`/chat/${chatId}/archive`, null, { params: { archived } })
    .then(response => response.data);

export const getChatMembers = ({ chatId, pageable }: GetChatMembersData, signal?: AbortSignal) =>
  apiInstance
    .get<ChatMember[]>(`/chat/${chatId}/members`, {
      signal,
      params: { page: pageable.page, size: pageable.size, sort: pageable.sort },
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
    })
    .then(response => response.data);

export const getChatPermissions = (name: EnumChatType) =>
  apiInstance
    .get<ChatType>(`/chat/permissions`, { params: { name } })
    .then(response => response.data);

export const addChatUser = ({ chatId, chatMembers }: addChatParams) =>
  apiInstance.post<Chat>(`/chat/${chatId}/members`, chatMembers).then(response => response.data);

export const removeMemberFromChat = ({ chatId, userId }: RemoveMemberFromChatParams) =>
  apiInstance.delete(`/chat/${chatId}/members/${userId}`).then(response => response.data);

export const leaveFromChat = (chatId?: number) =>
  apiInstance.delete(`/chat/${chatId}/members`).then(response => response.data);
