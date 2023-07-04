import { Outlet, useSearchParams } from 'react-router-dom';
import { Header } from '../header';
import { useEffect } from 'react';

export const RootLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const lng = searchParams.get('lng');

    if (lng) {
      setSearchParams('', { replace: true });
    }
  }, []);

  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};
