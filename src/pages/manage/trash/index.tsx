import React, { FC } from 'react';

import { routePath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';

const ManageTrash: FC = () => {
  const { goToRoute } = useProjectRoute();

  return (
    <div className=''>
      <p>this is Manage Trash Page</p>
    </div>
  );
};

export default ManageTrash;
