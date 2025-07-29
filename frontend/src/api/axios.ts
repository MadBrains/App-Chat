import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { getAuthTokens } from 'src/utils/helpers/authHelper';
import { getLocationOrigin } from 'src/utils/helpers/getLocationOrigin';
import { refreshMiddleware } from 'pages/_app';

const apiInstance = axios.create({
  baseURL: `${getLocationOrigin()}/api/v1.0`
});

const retryInstance = axios.create({
  baseURL: `${getLocationOrigin()}/api/v1.0`
});

// const isTokenedRequest = (url?: string) => {
//   if (!url) {
//     return true;
//   }
//
//   const nonJwtUrls = ['auth/registration', 'auth/reg', 'auth/refresh-token'];
//
//   return nonJwtUrls.some(nonReqUrl => url.indexOf(nonReqUrl) > -1);
// };

retryInstance.interceptors.request.use(config => {
  // url is /api/api/etc..
  if (!config.headers) config.headers = {};

  config.headers['Authorization'] = `Bearer ${getAuthTokens().access_token}`;

  return Promise.resolve(config);
});

const failedRequest = (failReq: any) => {
  const refreshToken = getAuthTokens().refresh_token;

  if (refreshToken)
    return refreshMiddleware
      .refreshRequest(refreshToken)
      .then(() => {
        const access_token = getAuthTokens().access_token;

        if (access_token) {
          apiInstance.defaults.headers['Authorization'] = `Bearer ${access_token}`;

          failReq.response.config.headers['Authorization'] = `Bearer ${access_token}`;

          return Promise.resolve();
        }

        return Promise.reject();
      })
      .catch(error => console.log(error));
  else {
    return Promise.reject(failReq);
  }
};

createAuthRefreshInterceptor(apiInstance, failedRequest, {
  statusCodes: [401, 403],
  retryInstance
});

const isTokenRequest = (requestUrl?: string) => {
  if (!requestUrl) {
    return true;
  }
  const nonJwtUrls = ['/auth/login', '/auth/registration', '/auth/refresh-token'];

  return !nonJwtUrls.find(url => url === requestUrl);
};

apiInstance.interceptors.request.use(
  config => {
    const originalRequest = config;
    const { access_token } = getAuthTokens();

    if (access_token && isTokenRequest(originalRequest.url)) {
      if (!originalRequest.headers) originalRequest.headers = {};

      originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
    }

    return Promise.resolve(originalRequest);
  },
  err => Promise.reject(err)
);

export default apiInstance;
