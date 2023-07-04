import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { store } from '../app/store';
import { TokenService } from '../utils/cookie-service';
import { AuthService } from '../features/auth';
import { removeUser } from '../features/user';

const baseURL = 'https://norma.nomoreparties.space/api';
const headers = {
  'Content-Type': 'application/json',
};

export const api = axios.create({
  baseURL,
  headers,
});

export const authApi = axios.create({
  baseURL: `${baseURL}/auth`,
  headers,
});

authApi.interceptors.request.use(
  (config) => {
    const accessToken = TokenService.getAccessToken();

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authApi.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err?.config;
    const errMessage = err.response?.data?.message;
    console.log('errMessage:', errMessage);

    // Access Token was expired
    if (errMessage?.includes('should be authorised') && !originalRequest.retry) {
      try {
        originalRequest.retry = true;
        console.log('try refresh token');
        const rs = await AuthService.refreshAccessToken(TokenService.getRefreshToken());

        const { accessToken: token, refreshToken } = rs.data;
        const accessToken = token.split(' ')[1];
        console.log('refresh success, new successToken:', accessToken);

        TokenService.setAccessToken(accessToken);
        TokenService.setRefreshToken(refreshToken);

        return authApi({
          ...originalRequest,
          headers: { ...originalRequest.headers, Authorization: `Bearer ${accessToken}` },
          retry: true,
        });
      } catch (err) {
        console.log('refresh token invalid - logout user');
        store.dispatch(removeUser());
        TokenService.removeTokens();
      }
    }
  }
);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
  },
});
