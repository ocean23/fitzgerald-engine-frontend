import { lazy } from 'react';
import { DefaultLayout } from '@layouts/index';
import { Suspense } from '@/components';

import appRoutes from './appRoutes';

const Login = lazy(() => import('@modules/login'));
const NotFound = lazy(() => import('@modules/error/notFound'));

const indexRouteConfig = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: appRoutes,
  },
  {
    path: '/login',
    element: (
      <Suspense>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense>
        <NotFound />
      </Suspense>
    ),
  },
];

export default indexRouteConfig;
