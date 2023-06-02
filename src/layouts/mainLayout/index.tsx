import { Layout } from 'antd';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Logo from '@/components/logo';
import UserInfo from '@/components/userInfo';
import styles from '@/styles/main/layout.module.scss';

const { Header, Footer, Sider, Content } = Layout;

// 入口布局
const MainLayout: FC = () => {
  return (
    <Layout className={styles.wrapper}>
      <Header className={styles.header}>
        <Logo />
        <UserInfo />
      </Header>
      <Content className={styles.main}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>
        <span className='prose prose-slate'>
          版权所有 © 2022-2023 星星问卷 All rights reserved.
        </span>
      </Footer>
    </Layout>
  );
};

export default MainLayout;
