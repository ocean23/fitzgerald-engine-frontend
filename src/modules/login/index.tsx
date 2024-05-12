import { useState } from 'react';
import { Typography, Space, Button, Input, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import authStore from '@/stores/auth';
import { urlHandler, httpRequest } from '@utils/index';

function Dashboard() {
  const [phone, setPhone] = useState(
    process.env.REACT_APP_LOCAL_LOGIN_PHONE_NUMBER
  );
  const [password, setPassword] = useState(
    process.env.REACT_APP_LOCAL_LOGIN_PASSWORD
  );

  const [code, setCode] = useState(process.env.REACT_APP_LOCAL_LOGIN_CODE);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      setLoading(true);
      const res: any = await httpRequest.post(
        `${process.env.REACT_APP_LOCAL_LOGIN_API_ENDPOINT}/pub/login`,
        {
          // loginType: 'pwd',
          password,
          code,
          mobile: phone,
        }
      );
      if (res?.code !== 0) {
        throw new Error(res?.msg);
      }
      Cookies.set('token', res?.data);
      Cookies.set('token', res?.data, {
        domain: urlHandler.getDomain(process.env.REACT_APP_PORTAL_ADDRESS),
      });
      authStore.setIsLoggedIn(true);

      navigate('/', { replace: true });

      const profile = await httpRequest.get(
        `${process.env.REACT_APP_LOCAL_LOGIN_API_ENDPOINT}/user/curInfo`
      );
      Cookies.set('userName', profile?.data?.userName);
      Cookies.set('userName', profile?.data?.userName, {
        domain: urlHandler.getDomain(process.env.REACT_APP_PORTAL_ADDRESS),
      });
      authStore.setProfile(profile?.data?.userName);
    } catch (err) {
      console.error(err);
      message.error(err.message || '登陆失败');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Space
      direction="vertical"
      style={{ display: 'flex', margin: '0 auto', maxWidth: '300px' }}
    >
      <Typography.Title level={3}>登录</Typography.Title>
      <Typography.Text type="secondary">
        此页面仅可在开发模式下访问
      </Typography.Text>
      <Input
        value={phone}
        placeholder="电话号码"
        onChange={(e) => setPhone(e.target.value)}
      />
      <Input
        value={password}
        placeholder="密码"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        value={code}
        placeholder="验证码"
        onChange={(e) => setCode(e.target.value)}
      />
      <Button onClick={handleLogin} loading={loading} type="primary">
        登录
      </Button>
    </Space>
  );
}

export default observer(Dashboard);
