import { LeftOutlined } from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';
import React from 'react';

import useProjectRoute from '@/hooks/useProjectRoute';
import EditHeaderToolbar from '@/pages/survey/edit/EditHeaderToolbar';

const EditHeader = () => {
  const { toPrevRoute } = useProjectRoute();

  return (
    <div className='flex h-16 items-center justify-between border-b border-slate-500 bg-white px-4'>
      <Space className='flex-1'>
        <Button type='link' icon={<LeftOutlined />} onClick={toPrevRoute}>
          返回
        </Button>
        <Typography.Title level={4} className='!my-0'>
          问卷标题
        </Typography.Title>
      </Space>

      <EditHeaderToolbar />

      <Space className='flex flex-1 justify-end'>
        <Button>保存</Button>
        <Button type='primary'>发布</Button>
      </Space>
    </div>
  );
};

export default EditHeader;
