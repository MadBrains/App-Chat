import apiInstance from 'src/api/axios';
import { getAuthTokens, setAuthTokens } from 'src/utils/helpers/authHelper';

export const refreshTokenRequest = (token: string) =>
  apiInstance
    .post('/auth/refresh-token', { refresh_token: token }, { skipAuthRefresh: true } as any)
    .then(res => {
      const access = res.data.access_token;
      const refresh = res.data.refresh_token;

      return { access_token: access, refresh_token: refresh };
    });

export const refreshTokenOnWebsocketConnect = () =>
  apiInstance
    .post('/auth/refresh-token', { refresh_token: getAuthTokens().refresh_token }, {
      skipAuthRefresh: true
    } as any)
    .then(res => {
      const access_token = res.data.access_token;
      const refresh_token = res.data.refresh_token;

      setAuthTokens({ access_token, refresh_token });
    });
