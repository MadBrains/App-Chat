import apiInstance from 'src/api/axios';
import { AxiosRequestConfig } from 'axios';
import { Role } from 'src/api/admin/types';

export const getAdminRoles = (signal: AxiosRequestConfig) => {
  return apiInstance.get<Array<Role>>('admin/roles', signal).then(res => res.data);
};

export const postAdminRoles = (data: Role) => {
  return apiInstance.post<Array<Role>>('admin/roles', data).then(res => res.data);
};
