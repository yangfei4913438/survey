import React, { FC } from 'react';

import { routePath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';

const Login: FC = () => {
  const { goToRoute } = useProjectRoute();

  return (
    <div className=''>
      <p>this is Login Page</p>
      <button type='button' onClick={() => goToRoute(routePath.home)}>
        去首页
      </button>
    </div>
  );
};

export default Login;
