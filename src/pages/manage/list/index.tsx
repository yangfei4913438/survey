import { useTitle } from 'ahooks';
import React, { FC } from 'react';

import { routePath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';

const ManageList: FC = () => {
  useTitle('星星问卷 - 我的问卷');
  const { goToRoute } = useProjectRoute();

  return (
    <div className=''>
      <p>this is Manage List Page</p>
    </div>
  );
};

export default ManageList;
