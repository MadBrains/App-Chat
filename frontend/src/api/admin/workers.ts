import apiInstance from 'src/api/axios';
import { EnumPermissionList } from 'src/api/types';
import { AdminWorkersParam, Role } from 'src/api/admin/types';

interface EditRoleParams {
  roleId: number;
  data: Role;
}

export const postAdminWorkers = async (data: AdminWorkersParam) => {
  await apiInstance.post('admin/users', data).then(response => response.data);
};

export const putAdminWorkers = (data: AdminWorkersParam) => {
  return apiInstance.put(`admin/users/${data.id}`, data).then(response => response.data);
};

export const getAdminPermission = () =>
  apiInstance.get<Array<EnumPermissionList>>('/admin/permissions').then(response => response.data);

export const editRole = (params: EditRoleParams) =>
  apiInstance.put(`admin/roles/${params.roleId}`, params.data).then(response => response.data);
