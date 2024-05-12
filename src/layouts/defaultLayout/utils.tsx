export const getMenusFromRoutes = (routes, permissions, path = '') => {
  const menus = [];
  let currentMenuKeys = [];
  let currentPaths = [];
  routes.forEach(({ options, children }) => {
    if (!options?.key) {
      return;
    }
    if (
      options?.link === path ||
      (options?.link !== '/' && path.indexOf(options?.link) === 0)
    ) {
      currentMenuKeys.push(options.key);
      currentPaths.push({
        title: options.title,
        key: options.key,
      });
    }
    if (
      !options.permissionKey ||
      options.allowAccess ||
      permissions?.includes(options.permissionKey)
    ) {
      const menu = {
        ...options,
        visible: options.displayInMenu !== false,
      };
      if (children?.length) {
        const childRes = getMenusFromRoutes(children, permissions, path);
        menu.children = childRes?.menus;
        currentMenuKeys = currentMenuKeys.concat(
          childRes?.currentMenuKeys || []
        );
        currentPaths = currentPaths.concat(childRes?.currentPaths || []);
      }
      menus.push(menu);
    }
  });

  return { menus, currentMenuKeys, currentPaths };
};

export default {};
