import useTitle from 'ahooks/es/useTitle';
import Button from 'antd/es/button';
import cls from 'classnames';
import React, { FC } from 'react';

import { routePath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';
import styles from '@/styles/base.module.scss';

const Home: FC = () => {
  // 设置页面标题
  useTitle('星星问卷 - 首页');
  const { goToRoute } = useProjectRoute();

  return (
    <article
      className={cls(
        styles.flexColCenter,
        'w-full min-h-inherit bg-gradient-to-r from-[#4facfe] from-0% to-[#00f2fe] to-100%'
      )}
    >
      <h1 className='prose prose-2xl text-4xl text-gray-900'>问卷调查 ｜ 在线投票</h1>
      <p className='prose prose-sm mt-0 text-lg text-gray-800'>
        已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980份
      </p>
      <Button type='primary' size='large' onClick={() => goToRoute(routePath.manageList)}>
        开始使用
      </Button>
    </article>
  );
};

export default Home;
