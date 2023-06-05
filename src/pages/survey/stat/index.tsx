import React, { FC } from 'react';

import useEditorComponents from '@/hooks/useEditorComponents';

const SurveyStat: FC = () => {
  const { editorComponentList, loading } = useEditorComponents();

  return (
    <div className=''>
      <p>this is Survey Stat Page</p>
    </div>
  );
};

export default SurveyStat;
