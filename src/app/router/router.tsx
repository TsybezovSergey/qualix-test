import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AppLayout } from '@app/ui';

import { RouterPaths } from '@shared/consts';

import { ErrorPage } from '@/pages/ErrorPage';
import { Request } from '@/pages/Request';
import { RequestNew } from '@/pages/RequestNew';
import { Requests } from '@/pages/Requests';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: RouterPaths.Requests,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Requests />,
          },
          {
            path: RouterPaths.Card,
            element: <Request />,
          },
          {
            path: RouterPaths.NewCard,
            element: <RequestNew />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={RouterPaths.Requests} replace />,
  },
]);
