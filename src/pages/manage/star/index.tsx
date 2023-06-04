import React, { FC } from 'react';

import useLoadingSurveyListData from '@/hooks/useLoadingSurveyListData';
import SurveyList from '@/pages/manage/components/surveyList';

const ManageStar: FC = () => {
  const { loading, data } = useLoadingSurveyListData<ResultSurveySimpleType>({ isStar: true });

  const list = data?.list || [];

  return <SurveyList title={'星标问卷'} list={list} loading={loading} />;
};

export default ManageStar;
