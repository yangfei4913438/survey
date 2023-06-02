import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import styles from '@/styles/survey/layout.module.scss';

const SurveyLayout: FC = () => {
  return (
    <section className={styles.wrapper}>
      <article>Survey Layout</article>
      <article>
        <Outlet />
      </article>
    </section>
  );
};

export default SurveyLayout;
