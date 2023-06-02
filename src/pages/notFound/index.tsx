import { Button, Result } from 'antd';
import cls from 'classnames';
import React from 'react';

import styles from '@/styles/base.module.scss';

const NotFound = () => {
  return (
    <section className={cls(styles.flexCenter, 'w-full h-full')}>
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
    </section>
  );
};

export default NotFound;
