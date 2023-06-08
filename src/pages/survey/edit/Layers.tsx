import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, Divider, Input, message, Space, Tooltip, Typography } from 'antd';
import cls from 'classnames';
import React, { ChangeEvent, useState } from 'react';

import {
  DragOverlay,
  DragSortableSimple,
  SortableContainer,
  SortableItem,
  SortableItemWrapper,
} from '@/components/DragSortable';
import useSurveyEditor from '@/hooks/useSurveyEditor';

const Layers = () => {
  const {
    editorComponentList,
    setActiveComponent,
    activeComponent,
    setComponentVisible,
    toggleComponentLockStatus,
    selectedId,
    setEditorComponentList,
    changeSelectedId,
    changeComponentTitle,
  } = useSurveyEditor();

  const [changeTitleID, setChangeTitleID] = useState('');

  const handleHidden = (comp: EditorComponentType) => {
    console.log('数据:', comp.fe_id, !comp.visible);
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

  const renderComponentList = (comp: EditorComponentType, dragging: boolean) => {
    return (
      <>
        <div
          key={comp.fe_id}
          className={cls(
            'group/layers flex p-3',
            dragging ? 'cursor-move pointer-events-none' : 'cursor-pointer'
          )}
        >
          <Typography.Paragraph
            strong
            className={cls('flex flex-1  items-center')}
            onClick={() => handleTitleClick(comp)}
          >
            {changeTitleID === comp.fe_id ? (
              <Input value={comp.title} onChange={(e) => handleChangeTitle(e, comp)} />
            ) : (
              comp.title
            )}
          </Typography.Paragraph>
          <Space className='w-20 opacity-30 group-hover/layers:opacity-100'>
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
  };

  const onDragStart = () => {
    console.log('Layers drag start...');
  };

  const onDragEnd = () => {
    // 更新编辑器组件列表信息
    console.log('Layers drag end...');
  };

  return (
    <div>
      <DragSortableSimple<EditorComponentType>
        containers={editorComponentList}
        setContainers={setEditorComponentList}
        setActiveItem={setActiveComponent}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <SortableContainer containerId={'layers'} itemIds={editorComponentList.map((i) => i.fe_id)}>
          {editorComponentList.map((item) => {
            return (
              <SortableItemWrapper key={item.fe_id} itemId={item.fe_id}>
                {renderComponentList(item, activeComponent?.fe_id === item.fe_id)}
              </SortableItemWrapper>
            );
          })}
        </SortableContainer>
        <DragOverlay>
          {activeComponent && (
            <SortableItem DragOverlay>{renderComponentList(activeComponent, true)}</SortableItem>
          )}
        </DragOverlay>
      </DragSortableSimple>
    </div>
  );
};

export default Layers;
