import { FC, useLayoutEffect } from 'react';
import { Outlet } from 'react-router-dom';

import useSurveyEditor from '@/hooks/useSurveyEditor';

const SurveyLayout: FC = () => {
  const { getSurveyData } = useSurveyEditor();

  useLayoutEffect(() => {
    getSurveyData();
  }, [getSurveyData]);

  return (
    <section className='h-screen w-screen'>
      <Outlet />
    </section>
  );
};

export default SurveyLayout;
