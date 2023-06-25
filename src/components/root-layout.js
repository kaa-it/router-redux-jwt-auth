import { Outlet } from 'react-router-dom';
import { Header } from './header';

export const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};
