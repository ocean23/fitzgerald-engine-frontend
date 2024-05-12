import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { ProtectedRoute, Suspense } from '@components/index';

const Review = lazy(() => import('./review'));

const strategy = {
  path: 'tableInfo',
  element: <Outlet />,
  options: {
    title: '策略E+',
    permissionKey: 'menu-strategy',
    key: 'menu-strategy',
    // icon: <Icon.UserDeleteOutlined />,
    link: '/strategy/tableInfo',
    allowAccess: true,
  },
  children: [
    {
      index: true,
      element: (
        <ProtectedRoute
          allowAccess={true}
          permissionKey="menu-strategy"
          title="策略E+"
          component={
            <Suspense>
              <Review />
            </Suspense>
          }
        />
      ),
    },
  ],
};

export default strategy;
