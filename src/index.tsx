import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import './app/i18n';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/api-setup';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        {/* Await rendering UI until the persisted data is available in the Redux store */}
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
