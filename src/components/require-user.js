import Cookies from 'js-cookie';
import { COOKIE, PATH, QUERYKEY } from '../utils/config';
import { useQuery } from '@tanstack/react-query';
import { AuthService } from '../services/api/auth-service';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const RequireUser = () => {
  const islogedIn = Cookies.get(COOKIE.LOGEDIN);
  const location = useLocation();

  const { data: user } = useQuery([QUERYKEY.USER], AuthService.getMe(), {
    retry: 1,
    onSuccess: (data) => {
      console.log('RequiredUser getMe', data);
    },
  });

  return islogedIn || user ? (
    <Outlet />
  ) : (
    <Navigate to={PATH.LOGIN} state={{ from: location }} replace />
  );
};
