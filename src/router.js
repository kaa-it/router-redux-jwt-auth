import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/home';
import { PATH } from './utils/config';
import { Profile } from './pages/profile';
import { Login } from './pages/login';
import { OrderFeed } from './pages/order-feed';
import { RootLayout } from './components/root-layout';
import { RootErrorPage } from './components/root-error-page';
import { ProfileLayout } from './components/profile-layout';
import { Orders } from './pages/orders';

export const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <RootLayout />,
    errorElement: <RootErrorPage />,
    children: [
      {
        errorElement: <RootErrorPage />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: PATH.PROFILE,
            element: <ProfileLayout />,
            children: [
              {
                index: true,
                element: <Profile />,
              },
              {
                path: PATH.ORDERS,
                element: <Orders />,
              },
            ],
          },
          {
            path: PATH.LOGIN,
            element: <Login />,
          },
          {
            path: PATH.ORDER_FEED,
            element: <OrderFeed />,
          },
        ],
      },
    ],
  },
]);
