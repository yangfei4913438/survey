import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, Divider, Input, message, Space, Tooltip, Typography } from 'antd';
import React, { ChangeEvent, useState } from 'react';

import useEditorComponents from '@/hooks/useEditorComponents';

const Layers = () => {
  const {
    setComponentVisible,
    toggleComponentLockStatus,
    selectedId,
    editorComponentList,
    changeSelectedId,
    changeComponentTitle,
  } = useEditorComponents();

  const [changeTitleID, setChangeTitleID] = useState('');

  const handleHidden = (comp: EditorComponentType) => {
    setComponentVisible(comp.fe_id, !comp.visible);
  };

  const handleLockToggle = (comp: EditorComponentType) => {
    if (!comp.visible) {
      message.warning('隐藏的组件无法被锁定');
      return;
    }
    toggleComponentLockStatus(comp.fe_id);
  };

  const handleTitleClick = (comp: EditorComponentType) => {
    if (comp.fe_id === selectedId) {
      setChangeTitleID(comp.fe_id);
    } else {
      changeSelectedId(comp.fe_id);
      setChangeTitleID('');
    }
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>, comp: EditorComponentType) => {
    // 有值才可以修改
    if (event.target.value) {
      changeComponentTitle(comp.fe_id, event.target.value);
    }
  };

  return (
    <div>
      {editorComponentList.map((comp) => {
        return (
          <>
            <div key={comp.fe_id} className='group/layers flex py-3'>
              <Typography.Paragraph
                strong
                className='flex flex-1 cursor-pointer items-center'
                onClick={() => handleTitleClick(comp)}
              >
                {changeTitleID === comp.fe_id ? (
                  <Input value={comp.title} onChange={(e) => handleChangeTitle(e, comp)} />
                ) : (
                  comp.title
                )}
              </Typography.Paragraph>
              <Space className='opacity-30 group-hover/layers:opacity-100'>
                <Tooltip title={comp.visible ? '点击隐藏' : '点击可见'}>
                  <Button
                    size='middle'
                    shape='circle'
                    type={comp.visible ? 'default' : 'primary'}
                    icon={comp.visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    onClick={() => handleHidden(comp)}
                  />
                </Tooltip>
                <Tooltip title={comp.locked ? '点击解锁' : '点击锁定'}>
                  <Button
                    size='middle'
                    shape='circle'
                    type={comp.locked ? 'primary' : 'default'}
                    icon={comp.locked ? <LockOutlined /> : <UnlockOutlined />}
                    onClick={() => handleLockToggle(comp)}
                  />
                </Tooltip>
              </Space>
            </div>
            <Divider className='my-0' />
          </>
        );
      })}
    </div>
  );
};

export default Layers;
