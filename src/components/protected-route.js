import { Navigate, Outlet, redirect } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PATH } from '../utils/config';
import { userLoader, userQuery } from '../services/loaders/user-loader';

const ProtectedRoute = () => {
  const { queryKey, queryFn } = userQuery();
  const { data: user } = useQuery({
    queryKey,
    queryFn,
  });

  console.log('Protected get user:', user);

  // if (user) {
  //   console.log('YOU are auth, but Auth NOT needed');
  //   return <Navigate to={PATH.LOGIN} replace />;
  // }

  if (user.ok === false) {
    console.log('YOU are NOT auth, but auth NEEDED');
    return <Navigate to={PATH.LOGIN} replace />;
  }

  console.log('ALL OK - auth and auth needed');
  return <Outlet />;
};

ProtectedRoute.getUser = userLoader;

export { ProtectedRoute };
