import { redirect } from 'react-router-dom';
import { PATH } from '../../utils/config';
import { persistor } from '../../app/store';
import { TokenService } from '../../utils/cookie-service';
import { removeUser } from '../../features/user';
import { AuthService } from '../../features/auth';

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
    dispatch(removeUser());
    persistor.purge();
    return redirect(PATH.LOGIN);
  }
};
