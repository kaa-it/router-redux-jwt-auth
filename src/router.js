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
import { ProfileLayoutErrorPage } from './components/profile-layout-error-page';
import { queryClient } from './services/api';
import { store } from './app/store';
import { OnlyAuth, OnlyUnAuth } from './components/protected-route';
import { userLoader } from './services/loaders/user-loader';
import { Register } from './pages/register';

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
            loader: Home.getIngredients(queryClient),
          },

          {
            path: PATH.PROFILE,
            element: <OnlyAuth component={<ProfileLayout />} />,
            action: ProfileLayout.action(store.dispatch),
            loader: userLoader(queryClient),
            children: [
              {
                errorElement: <ProfileLayoutErrorPage />,
                children: [
                  {
                    index: true,
                    element: <Profile />,
                    action: Profile.updateUser(store.dispatch),
                  },
                  {
                    path: PATH.ORDERS,
                    element: <Orders />,
                  },
                ],
              },
            ],
          },

          {
            path: PATH.LOGIN,
            element: <OnlyUnAuth component={<Login />} />,
            action: Login.action(store.dispatch),
          },
          {
            path: PATH.REGISTER,
            element: <OnlyUnAuth component={<Register />} />,
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
