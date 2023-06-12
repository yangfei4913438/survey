import { useTitle } from 'ahooks';
import React, { FC } from 'react';

import useSurveyEditor from '@/hooks/store/useSurveyEditor';
import EditCanvas from '@/pages/survey/edit/EditCanvas';
import EditHeader from '@/pages/survey/edit/EditHeader';
import LeftPanel from '@/pages/survey/edit/LeftPanel';
import RightPanel from '@/pages/survey/edit/RightPanel';

const SurveyEdit: FC = () => {
  const { clearSelectedId, pageInfo } = useSurveyEditor();
  // 设置页面标题
  useTitle(`星星问卷 - ${pageInfo.title}`);

  return (
    <div className='flex h-full min-w-lg flex-col bg-gray-50'>
      <EditHeader />
      <div
        className='flex flex-1 justify-between overflow-hidden bg-slate-100 p-4 xl:p-12'
        onClick={clearSelectedId}
      >
        <div className='w-80 bg-white p-4 xl:w-96 xl:p-8' onClick={(e) => e.stopPropagation()}>
          <LeftPanel />
        </div>
        <div
          className='my-4 w-1/4 min-w-sm overflow-auto bg-white px-6 py-4 xl:p-8'
          onClick={(e) => e.stopPropagation()}
        >
          <EditCanvas />
        </div>
        <div
          className='w-80 overflow-hidden bg-white p-4 xl:w-96 xl:p-8'
          onClick={(e) => e.stopPropagation()}
        >
          <RightPanel />
        </div>
      </div>
    </div>
  );
};

export default SurveyEdit;
