import React from 'react';
import { useTranslation } from 'react-i18next';
import { PATH } from '../utils/config';
import { Link, NavLink, Outlet } from 'react-router-dom';
import clsx from 'clsx';

export const ProfileLayout = () => {
  const { t } = useTranslation();

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
  return (
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
        <button type="submit" className="mt-4">
          {t('profile.nav.logout')}
        </button>
      </section>
      <section>
        <Outlet />
      </section>
    </div>
  );
};
