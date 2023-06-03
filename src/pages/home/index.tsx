import { Button } from 'antd';
import cls from 'classnames';
import React, { FC, useEffect } from 'react';

import { routePath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';
import { getQuestion } from '@/services/question';
import styles from '@/styles/base.module.scss';

type TempType = { id: string; title: string };

const Home: FC = () => {
  const { goToRoute } = useProjectRoute();

  useEffect(() => {
    getQuestion<TempType>('100').then(({ id, title }) => console.log(id, title));
    // createQuestion<{ id: string }>().then(({ id }) => console.log(id));
  }, []);

  return (
    <article
      className={cls(
        styles.flexColCenter,
        'w-full h-full bg-gradient-to-r from-[#4facfe] from-0% to-[#00f2fe] to-100%'
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
