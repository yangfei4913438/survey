import React, { FC } from 'react';

import logo from '@/assets/stars-logo.svg';
import { routePath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';
import styles from '@/styles/main/logo.module.scss';

const Logo: FC = () => {
  const { Link } = useProjectRoute();

  return (
    <section className={styles.container}>
      <Link to={routePath.home} title={'星星问卷'}>
        <div className={styles.logo}>
          <img src={logo} alt={'星星问卷'} className={styles.logoImg} />
          <span className={styles.logoText}>星星问卷</span>
        </div>
      </Link>
    </section>
  );
};

export default Logo;
