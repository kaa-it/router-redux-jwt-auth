import { useTranslation } from 'react-i18next';
import { ingredientsQuery } from '../services/loaders/ingredients-loader';
import { useQuery } from '@tanstack/react-query';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { PATH } from '../utils/config';

const Home = () => {
  const { t } = useTranslation();
  const { data: ingredients } = useQuery(ingredientsQuery());
  const location = useLocation();

  return (
    <section className="p-4">
      <p className="mb-4">{t('home.ingredientsCount', { count: ingredients.length })}</p>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id}>
            <Link to={`${PATH.INGREDIENTS}/${ingredient._id}`} state={{ from: location }}>
              {ingredient.name}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </section>
  );
};

export { Home };
