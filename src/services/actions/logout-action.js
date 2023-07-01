import { redirect } from 'react-router-dom';
import { COOKIE, PATH } from '../../utils/config';
import { AuthService } from '../api/auth-service';
import { logOut } from '../user-slice';
import Cookies from 'js-cookie';
import { persistor } from '../../app/store';
import { TokenService } from '../cookie-service';

// To use multiple actions on one rout you can assign for submit button
// <button type='submit' name='intent' value='id-for-action'>Submit</button>
// and detect action type like this:
// const actionType = formData.get('intent');
// switch (actionType) { case 'id-for-action: ....}

export const logoutAction = (dispatch) => async () => {
  const refreshToken = TokenService.getRefreshToken();

  try {
    await AuthService.logout(refreshToken);

    TokenService.removeTokens();
  } catch (err) {
  } finally {
    dispatch(logOut());
    persistor.purge();
    return redirect(PATH.LOGIN);
  }
};
