import { useTranslation } from 'react-i18next';

export const Home = () => {
  const { t } = useTranslation();
  const username = 'Arty';

  return (
    <>
      <div>Home</div>
      <h1>{t('home.greeting', { username })}</h1>
    </>
  );
};
