import useTitle from 'ahooks/es/useTitle';
import Button from 'antd/es/button';
import cls from 'classnames';
import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { routePath } from '@/consts/routes';
import { setNavigate } from '@/core/navigation';
import useProjectRoute from '@/hooks/useProjectRoute';
import styles from '@/styles/base.module.scss';

const Home: FC = () => {
  // 设置页面标题
  useTitle('星星问卷 - 首页');
  const { goToRoute } = useProjectRoute();

  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return (
    <div className={'flex h-full flex-1 flex-col'}>
      <article
        className={cls(
          styles.flexColCenter,
          'w-full flex-1 bg-gradient-to-r from-[#4facfe] from-0% to-[#00f2fe] to-100%'
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
      <div
        className={cls(
          'w-full min-h-18 flex justify-center items-center bg-white border border-t border-gray-200 border-solid text-center'
        )}
      >
        <span className='prose prose-slate'>
          版权所有 © 2022-2023 星星问卷 All rights reserved.
        </span>
      </div>
    </div>
  );
};

export default Home;
