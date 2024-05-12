import { ReactElement, lazy } from 'react';
import dashboard from '@modules/dashboard';
import { Suspense } from '@/components';
import strategy from './strategy';

const NotAuthorized = lazy(() => import('@/modules/error/notAuthorized'));

interface RouteConfig {
  path?: string;
  element: ReactElement;
  // 还可以添加其他需要的属性，比如component、exact、strict等
}

const appRoutesConfig: RouteConfig[] = [
  dashboard,
  strategy,
  {
    path: 'not-authorized',
    element: (
      <Suspense>
        <NotAuthorized />
      </Suspense>
    ),
  },
];
export default appRoutesConfig;
