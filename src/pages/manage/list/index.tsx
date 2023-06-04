import { useTitle } from 'ahooks';
import React, { FC } from 'react';

import useLoadingSurveyListData from '@/hooks/useLoadingSurveyListData';
import SurveyList from '@/pages/manage/components/surveyList';

const ManageList: FC = () => {
  useTitle('星星问卷 - 我的问卷');

  const { loading, data } = useLoadingSurveyListData<ResultSurveySimpleType>();

  const list = data?.list || [];

  return <SurveyList title={'我的问卷'} list={list} loading={loading} />;
};

export default ManageList;
