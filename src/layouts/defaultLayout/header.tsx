import { observer } from 'mobx-react-lite';
import Cookies from 'js-cookie';

import authStore from '@stores/auth';
import { Header as MyHeader } from '@components/index';
import { urlHandler } from '@utils/index';
import { storageKeys } from '@/constants';
import { StyledHeader } from './styles';
import BreadCrumb from './breadcrumb';

function Header() {
  const handleLogout = () => {
    const domain = urlHandler.getDomain(process.env.REACT_APP_PORTAL_ADDRESS);
    authStore.clearlogInfo();
    Cookies.remove(storageKeys.token);
    Cookies.remove(storageKeys.token, { domain });
    Cookies.remove(storageKeys.username);
    Cookies.remove(storageKeys.username, { domain });
    localStorage.removeItem(storageKeys.isAdmin);
  };
  return (
    <StyledHeader>
      <BreadCrumb />
      <MyHeader
        username={authStore.profile?.username}
        avatar={authStore.profile?.avatar}
        onLogout={handleLogout}
      />
    </StyledHeader>
  );
}

export default observer(Header);
