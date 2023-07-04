import { authApi } from "../../services/api-setup";

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

export const UserService = {
  getMe,
  editMe,
};
