import { Image } from 'antd';
import { observer } from 'mobx-react-lite';
import authStore from '@/stores/auth';

function Dashboard() {
  const imgUrl = authStore.brandUrl || process.env.REACT_APP_BRAND_URL;
  return (
    <div style={{ margin: '100px auto 0', width: 300 }}>
      <Image preview={false} src={imgUrl} width={300} />
    </div>
  );
}

export default observer(Dashboard);
