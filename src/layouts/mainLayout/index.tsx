import cls from 'classnames';
import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Logo from '@/components/logo';
import UserInfo from '@/components/userInfo';
import useJwt from '@/hooks/useJwt';
import styles from '@/styles/base.module.scss';

// 入口布局
const MainLayout: FC = () => {
  // 权限校验
  useJwt();

  return (
    <div className={'flex h-screen w-screen flex-col'}>
      <div
        className={cls(
          styles.flexCenterBetween,
          styles.header,
          'fixed w-screen top-0 z-40 px-8 min-h-header'
        )}
      >
        <Logo />
        <UserInfo />
      </div>
      <div className={'mt-header h-full'}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
