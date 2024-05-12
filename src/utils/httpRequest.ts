/* eslint-disable no-param-reassign */
import axios from 'axios';
import Cookies from 'js-cookie';
import { storageKeys } from '@/constants';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  timeout: 60000,
  headers: {},
});

const handleUnauthorized = () => {
  Cookies.remove(storageKeys.token);
  if (
    process.env.NODE_ENV === 'development' &&
    process.env.REACT_APP_LOCAL_LOGIN === 'true'
  ) {
    // 该条件仅在本地开发环境生效
    // eslint-disable-next-line max-len
    window.location.href = `${window.location.origin}${process.env.REACT_APP_ROUTER_BASENAME ? `/${process.env.REACT_APP_ROUTER_BASENAME}` : ''}/login`;
  } else {
    window.location.href = `${process.env.REACT_APP_PORTAL_ADDRESS}?from=${encodeURIComponent(window.location.href)}`;
  }
};

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers['X-User-Token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    if (response?.data?.code === 10) {
      handleUnauthorized();
    }
    return response.data;
  },
  (error) => {
    if (error.response.status === 401) {
      handleUnauthorized();
    }
    return Promise.reject(error);
  }
);

export default instance;
