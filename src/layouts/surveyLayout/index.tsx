import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { setNavigate } from '@/core/navigation';
import useLoadSurveyEditorData from '@/hooks/network/useLoadSurveyEditorData';

const SurveyLayout = () => {
  const { loadSurveyEditorData } = useLoadSurveyEditorData();
  const navigate = useNavigate();

  useEffect(() => {
    loadSurveyEditorData();
  }, [loadSurveyEditorData]);

  // 页面根路由2
  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return (
    <section className='h-screen w-screen'>
      <Outlet />
    </section>
  );
};

export default SurveyLayout;
