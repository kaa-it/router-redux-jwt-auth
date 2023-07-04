import Cookies from 'js-cookie';
import { COOKIE } from './config';

const expiresAccess = 1 / 2000;
const expiresRefresh = 7;

const setAccessToken = (accessToken) => {
  Cookies.set(COOKIE.ACCESSTOKEN, accessToken, { expires: expiresAccess });
};

const setRefreshToken = (refreshToken) => {
  Cookies.set(COOKIE.REFRESHTOKEN, refreshToken, { expires: expiresRefresh });
};

const getAccessToken = () => {
  return Cookies.get(COOKIE.ACCESSTOKEN);
};

const getRefreshToken = () => {
  return Cookies.get(COOKIE.REFRESHTOKEN);
};

const removeTokens = () => {
  Cookies.remove(COOKIE.ACCESSTOKEN);
  Cookies.remove(COOKIE.REFRESHTOKEN);
};

export const TokenService = {
  setAccessToken,
  setRefreshToken,
  getAccessToken,
  getRefreshToken,
  removeTokens,
};
