import { redirect } from 'react-router-dom';
import { PATH, QUERYKEY } from '../../utils/config';
import { AuthService } from '../api/auth-service';

export const userQuery = () => ({
  queryKey: [QUERYKEY.USER],
  queryFn: async () => {
    const user = await AuthService.getMe();
    console.log('user from userQuery', user);
    console.log('user.status', user?.status);

    if (!user || user?.status !== 200) {
      console.log('Not auth. Redirect to login');
      return redirect(PATH.LOGIN);
    }

    return user.data.user;
  },
});

export const userLoader = (queryClient) => async () => {
  return await queryClient.ensureQueryData(userQuery());
};
