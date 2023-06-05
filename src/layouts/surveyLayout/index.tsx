import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const SurveyLayout: FC = () => {
  return (
    <section className='h-screen w-screen'>
      <Outlet />
    </section>
  );
};

export default SurveyLayout;
