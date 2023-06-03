import cls from 'classnames';
import React, { FC } from 'react';

import logo from '@/assets/stars-logo.svg';
import { routePath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';
import styles from '@/styles/base.module.scss';

const Logo: FC = () => {
  const { Link } = useProjectRoute();

  return (
    <section className={cls(styles.flexCenterStart, 'w-52 h-full')}>
      <Link to={routePath.home} title={'星星问卷'} className='decoration-transparent'>
        <div className='flex items-center space-x-1'>
          <img src={logo} alt={'星星问卷'} className='h-5 w-5' />
          <span className={'prose-2xl text-white'}>星星问卷</span>
        </div>
      </Link>
    </section>
  );
};

export default Logo;
