import { Suspense, ReactNode } from 'react';
import { Spin } from 'antd';

interface SuspenseProps {
  children: ReactNode;
}

function MySuspense({ children }: SuspenseProps) {
  return (
    <Suspense
      fallback={
        <Spin
          spinning
          tip="页面加载中……"
          style={{
            left: '50%',
            top: '50%',
            position: 'absolute',
            transform: 'transform(-50%, -50%)',
          }}
        />
      }
    >
      {children}
    </Suspense>
  );
}

export default MySuspense;
