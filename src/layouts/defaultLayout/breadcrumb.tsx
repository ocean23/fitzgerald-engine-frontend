import { useLocation, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import authStore from '@stores/auth';
import appRoutes from '@/routes/appRoutes';
import { getMenusFromRoutes } from './utils';

import { StyledBreadcrumb as Breadcrumb } from './styles';

function BreadCrumb() {
  const location = useLocation();
  const routeParams: any = useParams();

  let staticPath = location.pathname;
  if (routeParams) {
    Object.keys(routeParams).forEach((key) => {
      staticPath = staticPath.replace(routeParams[key], `:${key}`);
    });
  }

  const { currentPaths } = getMenusFromRoutes(
    appRoutes || [],
    authStore.permissions,
    staticPath
  );
  return (
    <Breadcrumb>
      {currentPaths.map((item) => (
        <Breadcrumb.Item key={item.title}>{item.title}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

export default observer(BreadCrumb);
