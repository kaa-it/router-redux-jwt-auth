import { Navigate, useLocation } from 'react-router-dom';
import { PATH } from '../utils/config';
import { useSelector } from 'react-redux';
import { selectUser } from '../services/user-slice';

export const ProtectedRoute = ({ onlyUnAuth = false, component }) => {
  const user = useSelector(selectUser);
  const location = useLocation();

  // user unauth and route only for auth users
  if (!user && !onlyUnAuth) {
    return <Navigate to={PATH.LOGIN} state={{ from: location }} />;
  }

  if (user && onlyUnAuth) {
    const { from } = location.state || { from: { pathname: PATH.HOME } };
    console.log('from (only unAuth can)', from);
    return <Navigate to={from} />;
  }

  return component;
};
