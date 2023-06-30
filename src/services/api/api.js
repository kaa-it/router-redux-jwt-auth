import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthService } from './auth-service';
import { COOKIE, PATH } from '../../utils/config';
import { redirect } from 'react-router-dom';
import { store } from '../../app/store';
import { logOut } from '../user-slice';

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
    const accessToken = Cookies.get(COOKIE.ACCESSTOKEN);

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
        const rs = await AuthService.refreshAccessToken(Cookies.get(COOKIE.REFRESHTOKEN));

        const { accessToken: token, refreshToken } = rs.data;
        const accessToken = token.split(' ')[1];

        Cookies.set(COOKIE.ACCESSTOKEN, accessToken, { expires: 1 / 72 });
        Cookies.set(COOKIE.LOGEDIN, true, { expires: 1 / 72 });
        Cookies.set(COOKIE.REFRESHTOKEN, refreshToken, { expires: 7 });

        return authApi({
          ...originalRequest,
          headers: { ...originalRequest.headers, Authorization: `Bearer ${accessToken}` },
          retry: true,
        });
      } catch (err) {
        console.log('refresh invalid - logout user');
        store.dispatch(logOut());
        Cookies.remove(COOKIE.ACCESSTOKEN);
        Cookies.remove(COOKIE.LOGEDIN);
        Cookies.remove(COOKIE.REFRESHTOKEN);
        // return redirect(PATH.LOGIN);
        // return Promise.reject(err);
      }
    }

    // return Promise.reject(err);
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
