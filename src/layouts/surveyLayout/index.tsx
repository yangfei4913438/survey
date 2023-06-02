import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const SurveyLayout: FC = () => {
  return (
    <section className={''}>
      <article>Survey Layout</article>
      <article>
        <Outlet />
      </article>
    </section>
  );
};

export default SurveyLayout;
