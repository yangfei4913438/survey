import { Spin } from 'antd';
import cls from 'classnames';

import {
  DragOverlay,
  DragSortableSimple,
  SortableContainer,
  SortableItem,
  SortableItemWrapper,
} from '@/components/DragSortable';
import { getComponentConfByType } from '@/components/EditorComponents';
import useEditorCanvasKeyPress from '@/hooks/useEditorCanvasKeyPress';
import useSurveyEditor from '@/store/hooks/useSurveyEditor';

const EditCanvas = () => {
  useEditorCanvasKeyPress();
  const {
    changeSelectedId,
    isLoading,
    selectedId,
    activeComponent,
    setActiveComponent,
    editorComponentList,
    setEditorComponentList,
  } = useSurveyEditor();

  if (isLoading) {
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

  const renderComponentList = (comp: EditorComponentType, dragging = false) => {
    return (
      <div
        className={cls(
          { hidden: !comp.visible },
          'p-3',
          !dragging && 'rounded border border-solid cursor-pointer',
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

  const onDragStart = () => {
    console.log('canvas drag start...');
  };

  const onDragEnd = () => {
    console.log('canvas drag end...');
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
          <div className={'space-y-3'}>
            {editorComponentList.map((item) => {
              return (
                <SortableItemWrapper key={item.fe_id} itemId={item.fe_id}>
                  {renderComponentList(item, activeComponent?.fe_id === item.fe_id)}
                </SortableItemWrapper>
              );
            })}
          </div>
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

export default EditCanvas;
