import { Button } from 'antd';
import React, { FC } from 'react';

import { routePath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';
import styles from '@/styles/main/home.module.scss';

const Home: FC = () => {
  const { goToRoute } = useProjectRoute();

  return (
    <article className={styles.wrapper}>
      <h1>问卷调查 ｜ 在线投票</h1>
      <p>已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980份</p>
      <Button type='primary' size='large' onClick={() => goToRoute(routePath.manageList)}>
        开始使用
      </Button>
    </article>
  );
};

export default Home;
