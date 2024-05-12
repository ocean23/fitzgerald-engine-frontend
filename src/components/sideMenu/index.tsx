import { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const { SubMenu } = Menu;
interface MenuShape {
  title: string;
  key: string;
  icon?: any;
  link: string;
  children?: MenuShape[];
}

interface SideMenuProps {
  menus?: MenuShape[];
  selectedKeys?: string[];
  defaultOpenKeys?: string[];
}

function SideMenu({
  menus = [],
  selectedKeys = [],
  defaultOpenKeys = [],
}: SideMenuProps) {
  const navigate = useNavigate();
  const rootSubmenuKeys = menus.map(({ key }) => key);
  const [openKeys, setOpenKeys] = useState<any[]>([]);

  useEffect(() => {
    // @ts-ignore
    setOpenKeys((val): any[] => [...new Set([...defaultOpenKeys, ...val])]);
  }, [defaultOpenKeys]);

  const onOpenChange = (keys: any[]) => {
    const latestOpenKey: any = keys.find(
      (key: string) => openKeys.indexOf(key) === -1
    );
    // @ts-ignore
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey].concat(keys) : []);
    }
  };

  const handleMenuClick = ({ item }, menu) => {
    navigate(item.props.link, { state: { title: menu.title } });
  };

  const renderSubMenu = (list) =>
    list.map(
      (menu) =>
        menu.visible &&
        (menu.children &&
        menu.children.length &&
        menu.children.find((m) => m.visible) ? (
          <SubMenu key={menu.key} icon={menu.icon} title={menu.title}>
            {renderSubMenu(menu.children)}
          </SubMenu>
        ) : (
          <Menu.Item
            key={menu.key}
            icon={menu.icon}
            onClick={(props) => handleMenuClick(props, menu)}
            // @ts-ignore
            link={menu.link}
          >
            {menu.title}
          </Menu.Item>
        ))
    );

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      selectedKeys={selectedKeys}
    >
      {renderSubMenu(menus)}
    </Menu>
  );
}

export default SideMenu;
