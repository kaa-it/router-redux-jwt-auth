import { Navigate, useLocation } from 'react-router-dom';
import { PATH } from '../utils/config';
import { useQuery } from '@tanstack/react-query';
import { userQuery } from '../services/loaders/user-loader';

export const ProtectedRoute = ({ onlyUnAuth = false, component }) => {
  const { data: user } = useQuery(userQuery());
  const location = useLocation();

  // user unauth and route only for auth users
  if (!user && !onlyUnAuth) {
    return <Navigate to={PATH.LOGIN} state={{ from: location }} />;
  }

  if (user && onlyUnAuth) {
    const { from } = location.state || { from: { pathname: PATH.HOME } };
    return <Navigate to={from} />;
  }

  return component;
};
