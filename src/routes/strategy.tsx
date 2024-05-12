import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import strategy from '@/modules/strategy';

interface RouteConfig {
  path?: string;
  element: ReactElement;
  options: {
    title: string;
    permissionKey: string;
    key: string;
    icon: ReactElement;
    link: string;
    allowAccess: boolean;
  };
  children: any[];
  // 还可以添加其他需要的属性，比如component、exact、strict等
}

// Assign the object to a variable
const strategyRouteConfig: RouteConfig = {
  path: 'strategy',
  element: <Outlet />,
  options: {
    title: '策略E+',
    permissionKey: 'menu-strategy',
    key: 'menu-strategy',
    icon: <UserOutlined />,
    link: '/strategy',
    allowAccess: true,
  },
  children: [strategy],
};

export default strategyRouteConfig;
