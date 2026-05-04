import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import './main.scss';

import { router } from '@/app/router';
import { ErrorBoundary } from '@/shared/providers';

const ROOT_ELEMENT = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(ROOT_ELEMENT).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>,
);
