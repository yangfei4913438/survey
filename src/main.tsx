import '@/styles/index.scss';

import { Spin } from 'antd';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Suspense
    fallback={
      <div className={'flex h-screen w-screen items-center justify-center'}>
        <Spin size={'large'} />
      </div>
    }
  >
    <App />
  </Suspense>
);
