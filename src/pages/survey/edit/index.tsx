import React, { FC } from 'react';

import { routePath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';

import useLoadingSurveyData from '../hooks/useLoadingSurveyData';

const SurveyEdit: FC = () => {
  const { goToRoute } = useProjectRoute();

  const { data, loading } = useLoadingSurveyData<{ id: string; title: string }>();

  return (
    <div className=''>
      <p>this is Survey Edit Page</p>
      <p>{loading ? '加载中...' : `id: ${data?.id} title: ${data?.title}`}</p>
      <button type='button' onClick={() => goToRoute(routePath.login)}>
        登陆页
      </button>
    </div>
  );
};

export default SurveyEdit;
