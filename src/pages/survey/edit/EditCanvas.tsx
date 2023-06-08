import { Spin } from 'antd';
import cls from 'classnames';
import React from 'react';

import {
  DragOverlay,
  DragSortableSimple,
  SortableContainer,
  SortableItem,
  SortableItemWrapper,
} from '@/components/DragSortable';
import { getComponentConfByType } from '@/components/EditorComponents';
import useEditorCanvasKeyPress from '@/hooks/useEditorCanvasKeyPress';
import useSurveyEditor from '@/hooks/useSurveyEditor';

const EditCanvas = () => {
  useEditorCanvasKeyPress();
  const {
    loading,
    changeSelectedId,
    selectedId,
    activeComponent,
    setActiveComponent,
    editorComponentList,
    setEditorComponentList,
  } = useSurveyEditor();

  if (loading) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <Spin size={'large'} />
      </div>
    );
  }

  const renderComponent = (type: SurveyEditorComponentType, props: EditorComponentsPropsType) => {
    // 获取组件配置
    const conf = getComponentConfByType(type);
    if (conf) {
      const { Component } = conf;
      return <Component {...props} />;
    }
    return null;
  };

  const handleComponentClick = (id: string) => {
    changeSelectedId(id);
  };

  const renderComponentList = (comp: EditorComponentType) => {
    return (
      <div
        className={cls(
          { hidden: !comp.visible },
          'm-3 rounded border border-solid p-3 cursor-pointer',
          comp.fe_id === selectedId ? 'border-sky-500' : 'border-white hover:border-slate-300',
          comp.locked ? 'cursor-not-allowed opacity-50' : ' '
        )}
        onClick={() => handleComponentClick(comp.fe_id)}
        key={comp.fe_id}
      >
        <div className='pointer-events-none'>{renderComponent(comp.type, comp.props)}</div>
      </div>
    );
  };

  const onDragEnd = () => {
    console.log('drag end...');
  };

  const onDragStart = () => {
    console.log('drag start...');
  };

  return (
    <div className='min-h-full overflow-hidden bg-white'>
      <DragSortableSimple<EditorComponentType>
        containers={editorComponentList}
        setContainers={setEditorComponentList}
        setActiveItem={setActiveComponent}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <SortableContainer containerId={'canvas'} itemIds={editorComponentList.map((i) => i.fe_id)}>
          {editorComponentList.map((item) => {
            return (
              <SortableItemWrapper key={item.fe_id} itemId={item.fe_id}>
                {renderComponentList(item)}
              </SortableItemWrapper>
            );
          })}
        </SortableContainer>
        <DragOverlay>
          {activeComponent && (
            <SortableItem DragOverlay>{renderComponentList(activeComponent)}</SortableItem>
          )}
        </DragOverlay>
      </DragSortableSimple>
    </div>
  );
};

export default EditCanvas;
