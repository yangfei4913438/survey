import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeOutlined,
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import React from 'react';

import useSurveyEditor from '@/hooks/useSurveyEditor';

const EditHeaderToolbar = () => {
  const {
    setComponentVisible,
    removeSelectedComponent,
    selectedId,
    selectedComponent,
    toggleComponentLockStatus,
    copySelectComponent,
    copiedComponent,
    pasteCopiedComponent,
  } = useSurveyEditor();

  const handleHidden = () => {
    // 工具栏里面操作的都是选中组件，其他地方不一定是
    setComponentVisible(selectedId, false);
  };

  const handleLock = () => {
    toggleComponentLockStatus(selectedId);
  };

  return (
    <Space>
      <Tooltip title={'点击删除'}>
        <Button shape={'circle'} icon={<DeleteOutlined />} onClick={removeSelectedComponent} />
      </Tooltip>
      <Tooltip title={'点击隐藏'}>
        <Button shape={'circle'} icon={<EyeOutlined />} onClick={handleHidden} />
      </Tooltip>
      <Tooltip title={selectedComponent?.locked ? '点击解锁' : '点击锁定'}>
        <Button
          shape={'circle'}
          type={selectedComponent?.locked ? 'primary' : 'default'}
          icon={selectedComponent?.locked ? <LockOutlined /> : <UnlockOutlined />}
          onClick={handleLock}
        />
      </Tooltip>
      <Tooltip title={'点击复制'}>
        <Button shape={'circle'} icon={<CopyOutlined />} onClick={copySelectComponent} />
      </Tooltip>
      <Tooltip title={'点击粘贴'}>
        <Button
          shape={'circle'}
          icon={<BlockOutlined />}
          disabled={!copiedComponent} // 没有复制内容的时候，不能粘贴
          onClick={pasteCopiedComponent}
        />
      </Tooltip>
    </Space>
  );
};

export default EditHeaderToolbar;
