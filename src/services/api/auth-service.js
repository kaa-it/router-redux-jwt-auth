import { api, authApi } from './api';

const login = async ({ email, password }) => {
  const res = await api.post('/auth/login', {
    email,
    password,
  });

  return res.data;
};

const logout = async (refreshToken) => {
  return await api.post('/auth/logout', {
    token: refreshToken,
  });
};

const refreshAccessToken = async (refreshToken) => {
  return await api.post('/auth/token', {
    token: refreshToken,
  });
};

const getMe = async () => {
  return await authApi.get('/user');
};

const editMe = async ({ name, email, password }) => {
  const res = await authApi.patch('/user', {
    name,
    email,
    password,
  });

  return res.data;
};

export const AuthService = {
  login,
  logout,
  refreshAccessToken,
  getMe,
  editMe,
};
