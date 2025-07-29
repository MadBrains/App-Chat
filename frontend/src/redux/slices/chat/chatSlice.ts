import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosRequestConfig } from 'axios';
import {
  ChatMember as ChatMemberType,
  ChatWithMember,
  GetChatMembersData,
  MakeAdminChatData,
  RemoveMemberFromChatParams
} from 'src/api/chat/types';
import {
  getChatMembers as apiGetChatMembers,
  getChats,
  makeAdminChat as apiMakeAdminChat,
  removeMemberFromChat as apiRemoveMemberFromChat
} from 'src/api/chat';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';

interface ChatState {
  chatList: Array<ChatWithMember>;
  chatMembers: Array<ChatMemberType>;
  isLoading: boolean;
}

type MembersParams = GetChatMembersData & { signal?: AxiosRequestConfig['signal'] };
type ChatListParams = { signal?: AxiosRequestConfig['signal'] };

const initialState = {
  chatList: [],
  chatMembers: [],
  isLoading: true
} as ChatState;

export const getChatRooms = createAsyncThunk(
  'chat/getChatRooms',
  async ({ signal }: ChatListParams) =>
    await getChats({ page: 0, size: 100, sort: ['id,asc'] }, { signal })
);

export const getChatMembers = createAsyncThunk(
  'chat/getChatMembers',
  async ({ chatId, signal, pageable }: MembersParams) =>
    await apiGetChatMembers({ chatId, pageable }, signal)
);

export const makeAdminChat = createAsyncThunk(
  'chat/makeAdmin',
  async (params: MakeAdminChatData) => await apiMakeAdminChat(params)
);

export const removeMemberFromChat = createAsyncThunk(
  'chat/removeMember',
  async (params: RemoveMemberFromChatParams) => await apiRemoveMemberFromChat(params)
);

export const chat = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addChatRoom(state, action: PayloadAction<ChatWithMember>) {
      state.chatList.push(action.payload);
    },
    editChatRoom(state, action: PayloadAction<ChatWithMember>) {
      state.chatList = state.chatList.map(chat =>
        chat.id === action.payload.id ? action.payload : chat
      );
    },
    removeChatRoom(state, action: PayloadAction<number>) {
      state.chatList = state.chatList.filter(chat => chat.id !== action.payload);
    },
    mutingChat(state, { payload }: PayloadAction<{ chatId: number; mutedTo: string }>) {
      state.chatList = state.chatList.map(chat => {
        if (chat.id === payload.chatId) {
          return {
            ...chat,
            member: {
              ...chat.self_member,
              muted_to: payload.mutedTo
            }
          };
        }
        return chat;
      });
    },
    archivingChat(state, { payload }: PayloadAction<{ chatId: number; isArchived: boolean }>) {
      state.chatList = state.chatList.map(chat => {
        if (chat.id === payload.chatId) {
          return {
            ...chat,
            self_member: { ...chat.self_member, archived: payload.isArchived }
          };
        }
        return chat;
      });
    },
    chatAddMembers(state, action: PayloadAction<Array<ChatMemberType>>) {
      state.chatMembers.push(...action.payload);
    },
    chatRemoveMembers(state, action: PayloadAction<Array<ChatMemberType>>) {
      state.chatMembers = state.chatMembers.filter(
        chat => !action.payload.find(removedMembers => chat.user_id === removedMembers.user_id)
      );
    }
  },
  extraReducers: builder => {
    builder.addCase(getChatMembers.fulfilled, (state, action) => {
      state.chatMembers = action.payload;
    });
    builder.addCase(getChatRooms.fulfilled, (state, action) => {
      state.chatList = action.payload;
      state.isLoading = false;
    });
  }
});

export const {
  chatAddMembers,
  chatRemoveMembers,
  removeChatRoom,
  editChatRoom,
  addChatRoom,
  mutingChat,
  archivingChat
} = chat.actions;

export default chat.reducer;
