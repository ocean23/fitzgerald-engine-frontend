import { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { useLocation, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { SideMenu } from '@/components';
import authStore from '@/stores/auth';
import appRoutes from '@/routes/appRoutes';
import { StyledLayout as Layout, Logo, MenuCollapsedButton } from './styles';
import { getMenusFromRoutes } from './utils';

const MENU_COLLAPSED_KEY = 'menu-collapsed';

/**
 * Sider 组件
 *
 * @returns JSX.Element
 */
function Sider() {
  const location = useLocation();
  const params: any = useParams();
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem(MENU_COLLAPSED_KEY) === 'true'
  );

  let staticPath = location.pathname;
  if (params) {
    Object.keys(params).forEach((key) => {
      staticPath = staticPath.replace(params[key], `:${key}`);
    });
  }

  const { menus, currentMenuKeys } = getMenusFromRoutes(
    appRoutes || [],
    authStore.permissions,
    staticPath
  );

  const toggleCollapsed = () => {
    localStorage.setItem(MENU_COLLAPSED_KEY, !collapsed as any);
    setCollapsed(!collapsed);
  };

  // eslint-disable-next-line max-len, no-nested-ternary
  const logoUrl = collapsed
    ? authStore.logoUrl
      ? authStore.logoUrl
      : process.env.REACT_APP_LOGO_URL
    : authStore.brandUrl
      ? authStore.brandUrl
      : process.env.REACT_APP_BRAND_URL;

  return (
    <Layout.Sider collapsed={collapsed} theme="light">
      <Logo to="/">
        <img src={logoUrl} alt={process.env.REACT_APP_WEBSITE_TITLE} />
        <h1>{process.env.REACT_APP_WEBSITE_TITLE}</h1>
      </Logo>
      <div className="menu">
        <SideMenu
          menus={menus}
          selectedKeys={currentMenuKeys}
          defaultOpenKeys={currentMenuKeys}
        />
      </div>
      <MenuCollapsedButton
        type="text"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        <MenuOutlined />
      </MenuCollapsedButton>
    </Layout.Sider>
  );
}

export default observer(Sider);
