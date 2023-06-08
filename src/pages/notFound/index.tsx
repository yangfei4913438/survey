import { useTitle } from 'ahooks';
import { Button, Result } from 'antd';
import cls from 'classnames';
import React from 'react';

import styles from '@/styles/base.module.scss';

const NotFound = () => {
  // 设置页面标题
  useTitle('星星问卷 - 404');

  return (
    <article className={cls(styles.flexCenter, 'w-full min-h-inherit')}>
      <Result
        status='404'
        title='404'
        subTitle='很抱歉，您要访问的页面不存在。'
        extra={
          <Button type='primary' href='/'>
            返回首页
          </Button>
        }
      />
    </article>
  );
};

export default NotFound;
