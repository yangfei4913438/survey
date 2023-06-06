import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';

import useEditorComponents from '@/hooks/useEditorComponents';

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
  } = useEditorComponents();

  const handleHidden = () => {
    // 工具栏里面操作的都是选中组件，其他地方不一定是
    setComponentVisible(selectedId, false);
  };

  const handleLock = () => {
    toggleComponentLockStatus(selectedId);
  };

  return (
    <Space>
      <Tooltip title={'删除'}>
        <Button shape={'circle'} icon={<DeleteOutlined />} onClick={removeSelectedComponent} />
      </Tooltip>
      <Tooltip title={'隐藏'}>
        <Button shape={'circle'} icon={<EyeInvisibleOutlined />} onClick={handleHidden} />
      </Tooltip>
      <Tooltip title={'锁定'}>
        <Button
          shape={'circle'}
          type={selectedComponent?.locked ? 'primary' : 'default'}
          icon={<LockOutlined />}
          onClick={handleLock}
        />
      </Tooltip>
      <Tooltip title={'复制'}>
        <Button shape={'circle'} icon={<CopyOutlined />} onClick={copySelectComponent} />
      </Tooltip>
      <Tooltip title={'粘贴'}>
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
