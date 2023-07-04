import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/home';
import { PATH } from '../utils/config';
import { Profile } from '../pages/profile/profile';
import { Login } from '../pages/login/login';
import { OrderFeed } from '../pages/order-feed';
import { RootLayout } from '../layouts/root-layout/root-layout';
import { RootErrorPage } from '../layouts/root-layout/root-error-page';
import { Orders } from '../pages/orders';
import { ProfileLayoutErrorPage } from '../layouts/profile-layout/profile-layout-error-page';
import { queryClient } from '../services/api-setup';
import { store } from './store';
import { OnlyAuth, OnlyUnAuth } from '../components/protected-route';
import { userLoader } from '../layouts/profile-layout/user-loader';
import { Register } from '../pages/register';
import { ingredientsLoader } from '../layouts/root-layout/ingredients-loader';
import { ProfileLayout } from '../layouts/profile-layout/profile-layout';
import { IngredientModal } from '../features/ingredient-list';

export const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <RootLayout />,
    errorElement: <RootErrorPage />,
    loader: ingredientsLoader(queryClient),
    children: [
      {
        errorElement: <RootErrorPage />,
        children: [
          {
            path: PATH.HOME,
            element: <Home />,
            children: [
              {
                path: `${PATH.INGREDIENTS}/:id`,
                element: <IngredientModal />,
              },
            ],
          },

          {
            path: PATH.PROFILE,
            element: <OnlyAuth component={<ProfileLayout />} />,
            action: ProfileLayout.logout(store.dispatch),
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
            action: Login.login(store.dispatch),
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
