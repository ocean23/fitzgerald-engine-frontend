import { Outlet } from 'react-router-dom';

import Header from './header';
import Sider from './sider';
import { StyledLayout as Layout, StyledContent as Content } from './styles';

function DefaultLayout() {
  return (
    <Layout>
      <Sider />
      <Layout>
        <Header />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default DefaultLayout;
