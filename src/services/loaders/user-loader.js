import { QUERYKEY } from '../../utils/config';
import { AuthService } from '../api/auth-service';

export const userQuery = () => ({
  queryKey: [QUERYKEY.USER],
  queryFn: async () => {
    try {
      const user = await AuthService.getMe();
      return user.data.user;
    } catch (err) {
      console.error('Auth error:', err);
      return null;
    }
  },
});

export const userLoader = (queryClient) => async () => {
  return await queryClient.ensureQueryData(userQuery());
};
