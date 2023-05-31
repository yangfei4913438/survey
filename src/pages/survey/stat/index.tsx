import React, { FC } from 'react';

import { routePath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';

const SurveyStat: FC = () => {
  const {
    goToRoute,
    params: { id },
  } = useProjectRoute();

  return (
    <div className=''>
      <p>this is Survey Stat Page</p>
      <p>参数: {id}</p>
      <button type='button' onClick={() => goToRoute(routePath.surveyEdit)}>
        登陆页
      </button>
    </div>
  );
};

export default SurveyStat;
