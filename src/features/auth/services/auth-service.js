import { api } from '../../../services/api-setup';

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

export const AuthService = {
  login,
  logout,
  refreshAccessToken,
};
