import { Outlet } from 'react-router-dom';

const SurveyLayout = () => {
  return (
    <section className='h-screen w-screen'>
      <Outlet />
    </section>
  );
};

export default SurveyLayout;
