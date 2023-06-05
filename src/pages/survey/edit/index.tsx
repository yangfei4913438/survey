import React, { FC } from 'react';

import useEditorComponents from '@/hooks/useEditorComponents';
import EditCanvas from '@/pages/survey/edit/EditCanvas';

const SurveyEdit: FC = () => {
  const { clearSelectedId } = useEditorComponents();

  return (
    <div className='flex h-full min-w-lg flex-col bg-gray-50'>
      <div className='flex h-16 items-center justify-between bg-sky-500'>
        <div>左边</div>
        <div>中间</div>
        <div>右边</div>
      </div>
      <div
        className='flex flex-1 justify-between overflow-hidden bg-slate-100 p-4 xl:p-12'
        onClick={clearSelectedId}
      >
        <div className='w-80 bg-white p-4 xl:w-96 xl:p-8'>左边</div>
        <div className='mb-4 mt-16 w-1/4 min-w-sm overflow-auto bg-white p-4 xl:p-8'>
          <EditCanvas />
        </div>
        <div className='w-80 bg-white p-4 xl:w-96 xl:p-8'>右边</div>
      </div>
    </div>
  );
};

export default SurveyEdit;
