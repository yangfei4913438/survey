import React, { FC } from 'react';

import { routePath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';

const SurveyEdit: FC = () => {
  const {
    goToRoute,
    params: { id },
  } = useProjectRoute();

  return (
    <div className=''>
      <p>this is Survey Edit Page</p>
      <p>参数: {id}</p>
      <button type='button' onClick={() => goToRoute(routePath.login)}>
        登陆页
      </button>
    </div>
  );
};

export default SurveyEdit;
