import React, { FC } from 'react';

import useSurveyEditor from '@/hooks/useSurveyEditor';

const SurveyStat: FC = () => {
  const { editorComponentList, loading } = useSurveyEditor();

  return (
    <div className=''>
      <p>this is Survey Stat Page</p>
    </div>
  );
};

export default SurveyStat;
