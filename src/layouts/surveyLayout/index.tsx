import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import useLoadSurveyEditorData from '@/hooks/network/useLoadSurveyEditorData';

const SurveyLayout = () => {
  const { loadSurveyEditorData } = useLoadSurveyEditorData();

  useEffect(() => {
    loadSurveyEditorData();
  }, [loadSurveyEditorData]);

  return (
    <section className='h-screen w-screen'>
      <Outlet />
    </section>
  );
};

export default SurveyLayout;
