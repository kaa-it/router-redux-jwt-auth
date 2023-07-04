import { QUERYKEY } from '../../utils/config';
import { UserService } from '../../features/user';

export const userQuery = () => ({
  queryKey: [QUERYKEY.USER],
  queryFn: async () => {
    try {
      const user = await UserService.getMe();
      return user.data.user;
    } catch (err) {
      return null;
    }
  },
});

export const userLoader = (queryClient) => async () => {
  return await queryClient.ensureQueryData(userQuery());
};
