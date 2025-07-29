import { EnumPermissionList } from 'src/api/types';

export interface AdminWorkersParam {
  about_me?: string;
  avatar_url?: string;
  birth_date?: string;
  email: string;
  first_name?: string;
  id?: number;
  last_name?: string;
  middle_name?: string;
  outside_name?: string;
  user_type?: number;
  phone?: string;
  role_ids: Array<number>;
  permission_list: Array<string>;
}

export interface Role {
  id?: number;
  description?: string;
  deleted?: boolean;
  role_name?: string;
  permission_list: Array<EnumPermissionList>;
}
