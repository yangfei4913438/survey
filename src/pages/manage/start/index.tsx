import React, { FC } from 'react';

import { routePath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';

const ManageStart: FC = () => {
  const { goToRoute } = useProjectRoute();

  return (
    <div className=''>
      <p>this is Manage Start Page</p>
    </div>
  );
};

export default ManageStart;
