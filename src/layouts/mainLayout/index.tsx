import { Layout } from 'antd';
import cls from 'classnames';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Logo from '@/components/logo';
import UserInfo from '@/components/userInfo';
import useJwt from '@/hooks/useJwt';
import styles from '@/styles/base.module.scss';

const { Header, Content, Footer } = Layout;

// 入口布局
const MainLayout: FC = () => {
  // 权限校验
  useJwt();

  return (
    <Layout className='bg-white'>
      <Header className={cls(styles.flexCenterBetween, 'sticky top-0 z-40 px-8 h-16')}>
        <Logo />
        <UserInfo />
      </Header>

      <Content style={{ minHeight: `calc(100vh - 64px - 72px)` }}>
        <Outlet />
      </Content>

      <Footer className={cls('w-full h-18 border-t border-solid border-gray-200 text-center')}>
        <span className='prose prose-slate'>
          版权所有 © 2022-2023 星星问卷 All rights reserved.
        </span>
      </Footer>
    </Layout>
  );
};

export default MainLayout;
