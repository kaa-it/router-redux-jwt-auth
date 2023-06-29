import { useTranslation } from 'react-i18next';
import { ingredientsLoader, ingredientsQuery } from '../services/loaders/ingredients-loader';
import { useQuery } from '@tanstack/react-query';
import { userQuery } from '../services/loaders/user-loader';

const Home = () => {
  const { t } = useTranslation();
  const { data: ingredients } = useQuery(ingredientsQuery());
  // const { data: user } = useQuery(userQuery());

  // const username = user?.name;
  const count = ingredients.length;

  return (
    <section className="p-4">
      {/* {username && (
        <h1 className="font-size- font-bold mb-4">{t('home.greeting', { username })}</h1>
      )} */}
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
