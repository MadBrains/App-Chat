import apiInstance from 'src/api/axios';
import { AxiosRequestConfig } from 'axios';
import { toastAlert } from 'src/ui/Alert/toastify';
import qs from 'qs';
import { PageableParams } from 'src/api/chat/types';
import { EnumPermissionList } from 'src/api/types';

export interface UserData {
  about_me?: string;
  avatar_url?: string;
  birth_date?: string;
  email?: string;
  first_name?: string;
  id: number;
  last_name?: string;
  middle_name?: string;
  outside_name?: string;
  phone?: string;
  banId?: number;
  deleted?: boolean;
  user_type: number;
  role_ids?: Array<number>;
  permission_list?: Array<EnumPermissionList>;
}

interface ChangeUserInfoPayload {
  data: UserData;
}

interface ChangeUserPasswordPayload {
  new_pass: string;
  old_pass: string;
}

export interface GetUserParams {
  offset?: number;
  paged?: boolean;
  pageNumber?: number;
  pageSize?: number;
  sort?: {
    sorted?: boolean;
    unsorted?: boolean;
  };
  unpaged?: boolean;
}

export interface SearchUsersParams {
  text: string;
  pageable?: PageableParams;
}

export const updateUserInfo = async ({ data }: ChangeUserInfoPayload) =>
  await apiInstance
    .put(`/users`, data)
    .then(response => response.data)
    .catch(() => toastAlert('Что-то пошло не так', true));

export const changeUserEmail = async (email: string) =>
  await apiInstance.post('/users/email', { email }).then(response => response.data);

export const changeUserPassword = async (data: ChangeUserPasswordPayload) =>
  await apiInstance.post('/users/password', data).then(response => response.data);

export const getProfileInfo = async (signal?: AxiosRequestConfig) =>
  await apiInstance.get<UserData>('/profile/me', signal).then(response => response.data);

export const getUsers = async (signal: AbortSignal, params?: GetUserParams) =>
  await apiInstance
    .get<Array<UserData>>('/users', {
      signal,
      params: {
        page: params?.pageNumber,
        size: params?.pageSize
      },
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
    })
    .then(response => response.data);

export const searchUsers = async (params: SearchUsersParams, signal?: AbortSignal) =>
  await apiInstance
    .get<Array<UserData>>('/users/search', {
      signal,
      params: {
        text: params.text,
        page: params.pageable?.page,
        size: params.pageable?.size,
        sort: params.pageable?.sort
      },
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
    })
    .then(response => response.data);
