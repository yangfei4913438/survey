import { CheckOutlined, CloseOutlined, EditOutlined, LeftOutlined } from '@ant-design/icons';
import { useDebounceEffect, useKeyPress } from 'ahooks';
import { Button, Input, message, Space, Spin, Typography } from 'antd';
import React, { ChangeEvent, FC, useState } from 'react';

import { surveyPath } from '@/consts/routes';
import useUpdateSurvey from '@/hooks/network/useUpdateSurvey';
import useProjectRoute from '@/hooks/useProjectRoute';
import EditHeaderToolbar from '@/pages/survey/edit/EditHeaderToolbar';
import useSurveyEditor from '@/store/hooks/useSurveyEditor';

const TitleElem: FC = () => {
  const { pageInfo, setPageTitle, isLoading } = useSurveyEditor();
  const [editState, setEditState] = useState(false);
  const [title, setTitle] = useState('');

  const onSave = () => {
    if (title) {
      setPageTitle(title);
      setEditState(false);
    }
  };

  const onCancel = () => {
    setTitle('');
    setEditState(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  if (editState) {
    return (
      <Space>
        <Input defaultValue={pageInfo.title} onChange={handleChange} />
        <Space>
          <Button icon={<CloseOutlined />} shape={'circle'} onClick={onCancel} />
          <Button icon={<CheckOutlined />} shape={'circle'} onClick={onSave} />
        </Space>
      </Space>
    );
  }

  if (isLoading) {
    return <Spin size={'small'} />;
  }

  return (
    <Space>
      <Typography.Title level={4}>{pageInfo.title}</Typography.Title>
      <Button icon={<EditOutlined />} type={'link'} onClick={() => setEditState(true)} />
    </Space>
  );
};

const PublishButton: FC = () => {
  const { pageInfo, editorComponentList } = useSurveyEditor();
  const { changeSurvey, changeSurveyLoading } = useUpdateSurvey({
    id: pageInfo.id,
    updateData: { ...pageInfo, componentList: editorComponentList, isPublished: true },
    onSuccess: () => {
      message.success('发布成功', 1, () => {
        // 跳转统计页面, 这里需要刷新页面，拿到新的数据，所以不能使用单页路由的内部调整
        window.location.href = surveyPath.stat(pageInfo.id);
      });
    },
    onError: () => {
      message.error('发布失败，请稍后再试');
    },
  });

  const handlePublish = () => {
    if (changeSurveyLoading) return;
    changeSurvey();
  };

  return (
    <Button loading={changeSurveyLoading} type='primary' onClick={handlePublish}>
      发布
    </Button>
  );
};

const SaveButton: FC = () => {
  const { pageInfo, editorComponentList } = useSurveyEditor();

  const { changeSurvey, changeSurveyLoading } = useUpdateSurvey({
    id: pageInfo.id,
    updateData: { ...pageInfo, componentList: editorComponentList },
    onSuccess: () => {
      message.success('保存成功');
    },
    onError: () => {
      message.error('保存失败，请稍后再试');
    },
  });

  // 响应保存快捷键
  useKeyPress(['ctrl.s', 'meta.s'], (event) => {
    event.preventDefault();
    handleSave();
  });

  const handleSave = () => {
    if (changeSurveyLoading) return;
    changeSurvey();
  };

  // 自动保存
  useDebounceEffect(
    () => {
      // 当监控的数据变化了，就执行一次自动保存
      handleSave();
    },
    [pageInfo, editorComponentList],
    { wait: 3000 } // 3秒才会执行一次自动保存<不是定时保存！>
  );

  return (
    <Button loading={changeSurveyLoading} onClick={handleSave}>
      保存
    </Button>
  );
};

const EditHeader = () => {
  const { toPrevRoute } = useProjectRoute();

  return (
    <div className='flex h-16 items-center justify-between bg-white px-4 shadow-lg'>
      <Space className='flex-1'>
        <Button type='link' icon={<LeftOutlined />} onClick={toPrevRoute}>
          返回
        </Button>
        <TitleElem />
      </Space>

      <EditHeaderToolbar />

      <Space className='flex flex-1 justify-end'>
        <SaveButton />
        <PublishButton />
      </Space>
    </div>
  );
};

export default EditHeader;
