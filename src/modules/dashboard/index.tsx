import { DashboardOutlined } from '@ant-design/icons';
import { ProtectedRoute } from '@components/index';
import Dashboard from './review';

const dashboard = {
  index: true,
  element: (
    <ProtectedRoute
      permissionKey="menu-index"
      allowAccess
      title="首页"
      component={<Dashboard />}
    />
  ),
  options: {
    title: '首页',
    key: 'menu-index',
    icon: <DashboardOutlined />,
    link: '/',
    allowAccess: true,
  },
};

export default dashboard;
