import { useTranslation } from 'react-i18next';
import { COOKIE, PATH } from '../utils/config';
import { Form, NavLink, Navigate, Outlet, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import { logoutAction } from '../services/actions/logout-action';
import { userLoader, userQuery } from '../services/loaders/user-loader';

const ProfileLayout = () => {
  const { t } = useTranslation();
  console.log('ProfileLayout mounted');

  const paths = [
    {
      to: PATH.PROFILE,
      text: 'profile.nav.profile',
    },
    {
      to: PATH.ORDERS,
      text: 'profile.nav.orders',
    },
  ];

  const islogedIn = Cookies.get(COOKIE.LOGEDIN);
  const location = useLocation();

  const { queryKey, queryFn } = userQuery();
  const { data: user } = useQuery({ queryKey, queryFn, refetchOnMount: true });
  console.log('user in profile-layout', user);

  return islogedIn || user ? (
    <div className="flex flex-row gap-8 m-7">
      <section>
        <nav className="flex flex-col gap-4">
          {paths.map((path) => (
            <NavLink
              to={path.to}
              key={path.text}
              className={({ isActive }) => clsx({ 'font-bold': isActive })}
              end
            >
              {t(path.text)}
            </NavLink>
          ))}
        </nav>
        <Form method="post">
          <button type="submit" className="mt-4">
            {t('profile.nav.logout')}
          </button>
        </Form>
      </section>
      <section>
        <Outlet />
      </section>
    </div>
  ) : (
    <Navigate to={PATH.LOGIN} />
  );
};

ProfileLayout.action = logoutAction;
ProfileLayout.loader = userLoader;

export { ProfileLayout };
