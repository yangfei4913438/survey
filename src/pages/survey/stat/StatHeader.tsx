import { LeftOutlined } from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';
import React from 'react';

import { surveyPath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';
import useSurveyEditor from '@/hooks/useSurveyEditor';

const StatHeader = () => {
  const { toPrevRoute, goToRoute } = useProjectRoute();
  const { pageInfo } = useSurveyEditor();

  const handleEdit = () => {
    const path = surveyPath.edit(pageInfo.id);
    goToRoute<typeof path>(path);
  };

  return (
    <article className='flex h-16 items-center justify-between bg-white px-4 shadow-lg'>
      <Space className='flex-1'>
        <Button type='link' icon={<LeftOutlined />} onClick={toPrevRoute}>
          返回
        </Button>
        <Typography.Title level={4}>{pageInfo.title}</Typography.Title>
      </Space>
      <div className='flex-1 text-center'>占位文字</div>
      <Space className='flex flex-1 justify-end'>
        <Button type={'primary'} onClick={handleEdit}>
          编辑问卷
        </Button>
      </Space>
    </article>
  );
};

export default StatHeader;
