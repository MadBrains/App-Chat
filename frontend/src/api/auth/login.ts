import apiInstance from 'src/api/axios';
import { AuthTokens } from 'src/utils/helpers/authHelper';
import qs from 'qs';

interface LoginRequestParams {
  username: string;
  password: string;
}

export enum EnumInviteAction {
  REGISTRATION = 'REGISTRATION',
  LOGIN_VERIFICATION = 'LOGIN_VERIFICATION',
  ATTRIBUTE_VERIFICATION = 'ATTRIBUTE_VERIFICATION',
  PASSWORD_CHANGE = 'PASSWORD_CHANGE'
}
export interface InviteType {
  action: EnumInviteAction;
  invite_value: string;
  user_id: string;
}

interface RegistrationData {
  username: string;
  password: string;
}

interface NewPasswordData {
  userId: string;
  password: string;
  invite_code: string;
}
export const loginRequest = (data: LoginRequestParams) =>
  apiInstance.post<AuthTokens>('/auth/login', data).then(res => res.data);

export const invite = (data: string) =>
  apiInstance.get<InviteType>('/auth/invite', {
    params: { uuid: data },
    paramsSerializer: (params: any) => qs.stringify(params, { arrayFormat: 'repeat' })
  });

export const recoveryPassword = async (userEmail: string) =>
  await apiInstance
    .get('/auth/password-recovery', {
      params: { email: userEmail },
      paramsSerializer: (params: any) => qs.stringify(params, { arrayFormat: 'repeat' })
    })
    .then(response => response.data);

export const registration = async (data: RegistrationData) =>
  await apiInstance.post('/auth/registration', data).then(response => response.data);

export const setNewPassword = async (data: NewPasswordData) =>
  await apiInstance
    .post(
      '/auth/password-new',
      { password: data.password, invite_code: data.invite_code },
      {
        params: { userId: data.userId },
        paramsSerializer: (params: any) => qs.stringify(params, { arrayFormat: 'repeat' })
      }
    )
    .then(response => response.data);
