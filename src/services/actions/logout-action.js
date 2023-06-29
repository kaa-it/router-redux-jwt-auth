import { redirect } from 'react-router-dom';
import { COOKIE, PATH } from '../../utils/config';
import { AuthService } from '../api/auth-service';
import { logOut } from '../user-slice';
import Cookies from 'js-cookie';
import { persistor } from '../../app/store';

// To use multiple actions on one rout you can assign for submit button
// <button type='submit' name='intent' value='id-for-action'>Submit</button>
// and detect action type like this:
// const actionType = formData.get('intent');
// switch (actionType) { case 'id-for-action: ....}

export const logoutAction = (dispatch) => async () => {
  const refreshToken = Cookies.get(COOKIE.REFRESHTOKEN);
  console.log('refresh:', refreshToken);

  try {
    await AuthService.logout(refreshToken);

    Cookies.remove(COOKIE.ACCESSTOKEN);
    Cookies.remove(COOKIE.REFRESHTOKEN);
    Cookies.remove(COOKIE.LOGEDIN);

    dispatch(logOut());
    persistor.purge();

    return redirect(PATH.HOME);
  } catch (err) {
    throw new Response('', {
      statusText: 'Logout error',
    });
  }
};
