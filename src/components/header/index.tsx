import { useCallback } from 'react';
import { Avatar, Space, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { HeaderContainer } from './styles';

const menuItems = [
  {
    label: '退出登录',
    key: 'logout',
    icon: <UserOutlined />,
  },
];

interface DropdownMenuProps {
  username: string;
  avatar?: string;
  onMenuClick: () => void;
}

function DropdownMenu({
  username = '',
  avatar = '',
  onMenuClick,
}: DropdownMenuProps) {
  const menuProps = {
    items: menuItems,
    onClick: onMenuClick,
  };

  return (
    <Dropdown menu={menuProps}>
      <Space>
        <span className="username">{username}</span>
        <Avatar
          size={30}
          src={avatar || undefined}
          icon={!avatar && <UserOutlined />}
        />
      </Space>
    </Dropdown>
  );
}

interface HeaderProps {
  username?: string;
  avatar?: string;
  onLogout: () => void;
}

function Header({
  username = '',
  avatar = '',
  onLogout = () => {},
}: HeaderProps) {
  const handleMenuClick = useCallback(
    () => {
      onLogout();
    },
    [onLogout]
  );

  return (
    <HeaderContainer className="header">
      <Space>
        <DropdownMenu
          username={username}
          avatar={avatar}
          onMenuClick={handleMenuClick}
        />
      </Space>
    </HeaderContainer>
  );
}

export default Header;
