import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
  UnlockOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import React from 'react';

import useSurveyEditor from '@/hooks/useSurveyEditor';

const EditHeaderToolbar = () => {
  const {
    setComponentVisible,
    removeSelectedComponent,
    selectedId,
    selectedComponentIndex,
    selectedComponent,
    toggleComponentLockStatus,
    copySelectComponent,
    copiedComponent,
    pasteCopiedComponent,
    isFirstVisibleComponent,
    isLastVisibleComponent,
    moveComponentToPrev,
    moveComponentToNext,
    componentOperationUndo,
    componentOperationRedo,
  } = useSurveyEditor();

  // 隐藏
  const handleHidden = () => {
    // 工具栏里面操作的都是选中组件，其他地方不一定是
    setComponentVisible(selectedId, false);
  };

  // 切换锁定状态
  const handleLock = () => {
    toggleComponentLockStatus(selectedId);
  };

  // 上移
  function moveUp() {
    moveComponentToPrev(selectedComponentIndex);
  }

  // 下移
  function moveDown() {
    moveComponentToNext(selectedComponentIndex);
  }

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
      <Tooltip title='上移选中组件'>
        <Button
          shape='circle'
          icon={<UpOutlined />}
          onClick={moveUp}
          disabled={isFirstVisibleComponent}
        />
      </Tooltip>
      <Tooltip title='下移选中组件'>
        <Button
          shape='circle'
          icon={<DownOutlined />}
          onClick={moveDown}
          disabled={isLastVisibleComponent}
        />
      </Tooltip>
      <Tooltip title='点击撤销'>
        <Button shape='circle' icon={<UndoOutlined />} onClick={componentOperationUndo}></Button>
      </Tooltip>
      <Tooltip title='点击重做'>
        <Button shape='circle' icon={<RedoOutlined />} onClick={componentOperationRedo}></Button>
      </Tooltip>
    </Space>
  );
};

export default EditHeaderToolbar;
