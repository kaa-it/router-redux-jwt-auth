import { redirect } from 'react-router-dom';
import { AuthService } from '../api/auth-service';
import { setUser } from '../user-slice';
import { PATH } from '../../utils/config';

export const updateUserAction =
  (dispatch) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const { name, email, password } = Object.fromEntries(formData);

    const { user } = await AuthService.editMe({ name, email, password });

    dispatch(setUser({ user }));

    return redirect(PATH.PROFILE);
  };
