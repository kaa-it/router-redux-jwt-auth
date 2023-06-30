import { QUERYKEY } from '../../utils/config';
import { AuthService } from '../api/auth-service';

export const userQuery = () => ({
  queryKey: [QUERYKEY.USER],
  queryFn: async () => {
    const user = await AuthService.getMe();

    if (!user || user?.status !== 200) {
      console.log('Not auth. Return user:', user);
      return null;
    }

    return user.data.user;
  },
});

export const userLoader = (queryClient) => async () => {
  return await queryClient.ensureQueryData(userQuery());
};
