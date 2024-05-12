/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-curly-spacing */
import { useEffect, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate, useLocation } from 'react-router-dom';

import authStore from '@stores/auth';
import documentStore from '@stores/document';

interface ProtectedRouteProps {
  component: ReactNode;
  permissionKey: string;
  allowAccess?: boolean;
  title?: string;
}

function ProtectedRoute({
  component,
  permissionKey,
  allowAccess = false,
  title = '',
}: ProtectedRouteProps) {
  const location = useLocation();

  useEffect(() => {
    document.title = `${process.env.REACT_APP_WEBSITE_TITLE}${title ? ` - ${title}` : ''}`;
    documentStore.setPageTitle(title);
  }, [title]);

  if (!authStore.isLoggedIn) {
    if (
      process.env.NODE_ENV === 'development' &&
      process.env.REACT_APP_LOCAL_LOGIN === 'true'
    ) {
      // 该条件仅在本地开发环境生效
      return <Navigate to="/login" state={{ from: location }} />;
    }
    window.location.href = `${process.env.REACT_APP_PORTAL_ADDRESS}?from=${encodeURIComponent(window.location.href)}`;
    return null;
  }

  const isAuthorized =
    authStore.isAdmin ||
    allowAccess ||
    authStore.permissions?.includes(permissionKey);
  if (!isAuthorized) {
    return <Navigate to="/not-authorized" state={{ from: location }} />;
  }

  return component;
}
export default observer(ProtectedRoute);
