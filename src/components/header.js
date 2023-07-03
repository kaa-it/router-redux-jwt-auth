import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { PATH } from '../utils/config';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { t } = useTranslation();

  const paths = [
    {
      to: PATH.HOME,
      text: 'nav.home',
    },
    {
      to: PATH.ORDER_FEED,
      text: 'nav.orders',
    },
    {
      to: PATH.PROFILE,
      text: 'nav.profile',
    },
  ];

  return (
    <header>
      <nav className="flex justify-center gap-6 border py-4 h-16">
        {paths.map((path) => (
          <NavLink
            to={path.to}
            key={path.text}
            className={({ isActive }) => clsx({ 'font-bold': isActive })}
          >
            {t(path.text)}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};
