import Cookies from 'js-cookie';
import { getLocationOrigin } from 'src/utils/helpers/getLocationOrigin';
import { refreshTokenRequest } from 'src/api/auth/refresh-token';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export const setAuthTokens = (tokens: AuthTokens): boolean => {
  if (!tokens) {
    return false;
  }

  const { access_token, refresh_token } = tokens;
  if (access_token && refresh_token) {
    Cookies.set(ACCESS_TOKEN_KEY, access_token, { expires: 7, sameSite: 'lax' });
    Cookies.set(REFRESH_TOKEN_KEY, refresh_token, { expires: 7, sameSite: 'lax' });
    return true;
  }
  return false;
};

export const getAuthTokens = (): AuthTokens => {
  const access_token = Cookies.get(ACCESS_TOKEN_KEY) || '';
  const refresh_token = Cookies.get(REFRESH_TOKEN_KEY) || '';

  return { access_token, refresh_token };
};

export const removeAuthTokens = () => {
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
};

export default class RefreshMiddleware {
  isRequestInProcess: boolean;

  promise?: Promise<any>;

  counter: number;

  isTokenUpdated: boolean;

  constructor() {
    this.isRequestInProcess = false;
    this.counter = 0;
    this.isTokenUpdated = false;
  }

  private clearUpdateTokenStatus() {
    setTimeout(() => {
      this.isTokenUpdated = false;
    }, 10000);
  }

  refreshRequest(currentRefreshToken: string, mark?: string) {
    this.counter += 1;

    if (this.isTokenUpdated) {
      return Promise.resolve();
    }

    if (this.promise && this.isRequestInProcess) {
      return this.promise;
    }

    this.isRequestInProcess = true;

    this.promise = refreshTokenRequest(currentRefreshToken)
      .then(({ access_token, refresh_token }) => {
        setAuthTokens({ access_token, refresh_token });

        this.isTokenUpdated = true;

        this.clearUpdateTokenStatus();
      })
      .catch(() => {
        removeAuthTokens();
        window.location.href = `${getLocationOrigin(true)}/auth`;
      })
      .finally(() => {
        this.isRequestInProcess = false;
      });

    return this.promise;
  }
}
