import { AuthService } from '../api/auth-service';
import Cookies from 'js-cookie';
import { setUser } from '../user-slice';
import { redirect } from 'react-router-dom';
import { COOKIE, PATH } from '../../utils/config';

export const loginAction =
  (dispatch) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);

    const { accessToken: token, refreshToken, user } = await AuthService.login(credentials);

    const accessToken = token.split(' ')[1];

    // expires in days: accessToken expires at 20 min
    Cookies.set(COOKIE.ACCESSTOKEN, accessToken, { expires: 1 / 72 });
    Cookies.set(COOKIE.LOGEDIN, true, { expires: 1 / 72 });
    Cookies.set(COOKIE.REFRESHTOKEN, refreshToken, { expires: 7 });

    dispatch(setUser({ user }));

    return redirect(PATH.HOME);
  };
