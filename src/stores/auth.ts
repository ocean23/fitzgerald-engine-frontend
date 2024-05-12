import { makeAutoObservable, runInAction } from 'mobx';
import Cookies from 'js-cookie';
import { httpRequest } from '@/utils';
import { storageKeys } from '@/constants';

const LoggedIn = !!Cookies.get(storageKeys.token);

const initPermissions = localStorage.getItem(storageKeys.permissions)
  ? JSON.parse(localStorage.getItem(storageKeys.permissions))
  : [];

class Auth {
  profile = {
    username: Cookies.get(storageKeys.username),
    avatar: '',
  };

  logoUrl = '';

  brandUrl = '';

  isLoggedIn = LoggedIn;

  permissions = initPermissions;

  isAdmin = false;

  isPlus = false;

  constructor() {
    makeAutoObservable(this);
    if (LoggedIn) {
      this.getPermission();
      this.getCurInfo();
    }
  }

  setProfile(username?: string, avatar?: string) {
    this.profile.username = username;
    this.profile.avatar = avatar;
  }

  setIsLoggedIn(isLoggedIn) {
    this.isLoggedIn = isLoggedIn;
    if (isLoggedIn) {
      this.getPermission();
      this.getCurInfo();
    }
  }

  /**
   * 获取当前用户信息
   *
   * @returns Promise<void>
   */
  async getCurInfo() {
    try {
      const res: any = await httpRequest.get(
        `${process.env.REACT_APP_LOCAL_LOGIN_API_ENDPOINT}/user/curInfo`
      );
      if (res.code === 0) {
        runInAction(() => {
          this.brandUrl = res.data.brandUrl;
          this.logoUrl = res.data.logoUrl;
          this.setProfile(res?.data?.userName, '');
        });
      }
    } catch (err) {
      console.log(err?.message);
    }
  }

  setPermissions(permissions) {
    this.permissions = permissions;
  }

  /**
   * 获取权限信息
   *
   * @returns Promise<void>
   */
  async getPermission() {
    try {
      const res: any = await httpRequest.get('/permission/detail');
      if (res.code === 0) {
        runInAction(() => {
          const { permissions, admin, plus } = res.data || {};
          this.permissions = permissions;
          localStorage.setItem(
            storageKeys.permissions,
            JSON.stringify(permissions)
          );
          localStorage.setItem(storageKeys.isAdmin, admin);
          this.isAdmin = admin;
          this.isPlus = plus;
        });
      }
    } catch (err) {
      console.log(err?.message || '获取权限失败');
    }
  }

  clearlogInfo() {
    this.profile = {
      username: '',
      avatar: '',
    };
    this.isLoggedIn = false;
    this.permissions = [];
    this.isAdmin = false;
    this.isPlus = false;
  }
}

export default new Auth();
