import { Layout } from 'antd';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Logo from '@/components/logo';
import UserInfo from '@/components/userInfo';

const { Header, Footer, Sider, Content } = Layout;

// 入口布局
const MainLayout: FC = () => {
  return (
    <Layout className={'flex h-screen flex-col bg-white'}>
      <Header className={'flex h-16 justify-between px-6'}>
        <Logo />
        <UserInfo />
      </Header>
      <Content className={'flex-1'}>
        <Outlet />
      </Content>
      <Footer className={'h-18 border-t border-solid border-gray-200 bg-gray-50 text-center'}>
        <span className='prose prose-slate'>
          版权所有 © 2022-2023 星星问卷 All rights reserved.
        </span>
      </Footer>
    </Layout>
  );
};

export default MainLayout;
