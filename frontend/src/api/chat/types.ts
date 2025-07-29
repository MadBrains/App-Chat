export enum EnumChatType {
  PRIVATE = 'PRIVATE',
  GROUP_CHAT = 'GROUP_CHAT',
  CLIENT = 'CLIENT',
  THREAD = 'THREAD',
  SAVED = 'SAVED'
}

export enum EnumChatPermissions {
  DESCRIPTION_EDIT = 'DESCRIPTION_EDIT',
  MEMBER_INVITE = 'MEMBER_INVITE',
  MEMBER_PUBLIC = 'MEMBER_PUBLIC',
  MESSAGE_SEND_OUT = 'MESSAGE_SEND_OUT',
  MESSAGE_SEND_NEW = 'MESSAGE_SEND_NEW',
  THREAD_ENABLED = 'THREAD_ENABLED',
  HISTORY_DISABLED = 'HISTORY_DISABLE'
}
export enum EnumActionWithChat {
  CREATE_CHAT = 'CREATE_CHAT',
  EDIT_CHAT = 'EDIT_CHAT'
}
export interface PageableParams {
  page?: number;
  size?: number;
  sort?: Array<string>;
}

export interface GetChatMembersData {
  chatId?: number;
  pageable: PageableParams;
}

export interface ArchiveChatData {
  chatId: number;
  archived: boolean;
}

export interface IgnoreInvocationData {
  chatId: number;
  ignoreInvocation: boolean;
}

export interface MakeAdminChatData {
  chatId?: number;
  userId?: number;
  admin: boolean;
}

export interface MuteChatData {
  chatId: number;
  mutedTo: string;
}

export interface EditChatData {
  chatId?: number;
  data: Chat;
}

export interface ChatMember {
  archived?: boolean;
  phone?: string;
  user_id?: number;
  chat_id?: number;
  is_admin?: boolean;
  ignore_invocation?: boolean;
  muted_to?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  email?: string;
}

export interface ChatType {
  id?: number;
  chat_type?: EnumChatType;
  available_permissions?: Array<EnumChatPermissions>;
  default_permissions?: Array<EnumChatPermissions>;
}

export interface Chat {
  id?: number;
  description?: string;
  members?: Array<ChatMember>;
  chat_type?: EnumChatType;
  chat_name?: string;
  avatar_image?: string;
  chat_permission_list?: Array<EnumChatPermissions>;
  pinned_message_list?: string;
  is_deleted?: boolean;
}

export interface ChatWithMember extends Chat {
  self_member?: ChatMember;
  last_message?: LastMessage;
}

export interface addChatParams {
  chatId?: number;
  chatMembers: ChatMember[];
}

export interface RemoveMemberFromChatParams {
  chatId?: number;
  userId?: number;
}

export interface LastMessage {
  first_name?: string;
  last_name?: string;
  message_body?: string;
}

export type TranslatedPermission = { [key in EnumChatPermissions]: string };

export interface TranslatedPermissionEnum {
  values: TranslatedPermission;
}
