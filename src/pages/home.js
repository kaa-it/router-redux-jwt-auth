import { useTranslation } from 'react-i18next';
import { ingredientsLoader, ingredientsQuery } from '../services/loaders/ingredients-loader';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
  const { t } = useTranslation();
  const { data: ingredients } = useQuery(ingredientsQuery());

  const username = 'Arty';
  const count = ingredients.length;

  return (
    <section className="p-4">
      <h1 className="font-size- font-bold mb-4">{t('home.greeting', { username })}</h1>
      <p className="mb-4">{t('home.ingredientsCount', { count })}</p>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id}>
            <p>{ingredient.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

Home.getIngredients = ingredientsLoader;

export { Home };
