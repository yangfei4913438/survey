import { Spin } from 'antd';
import cls from 'classnames';

import { getComponentConfByType } from '@/components/EditorComponents';
import useEditorComponents from '@/hooks/useEditorComponents';

const EditCanvas = () => {
  const { editorComponentList, loading, changeSelectedId, selectedId } = useEditorComponents();

  if (loading) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <Spin size={'large'} />
      </div>
    );
  }

  const renderComponent = (type: EditorComponentTypes, props: EditorComponentsPropsType) => {
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

  return (
    <div className='min-h-full overflow-hidden bg-white' onClick={(e) => e.stopPropagation()}>
      {editorComponentList.map((item) => {
        return (
          <div
            className={cls(
              'm-3 rounded border border-solid p-3 hover:border-slate-400',
              item.fe_id === selectedId ? 'border-sky-500' : 'border-white'
            )}
            onClick={() => handleComponentClick(item.fe_id)}
            key={item.fe_id}
          >
            <div className='pointer-events-none'>{renderComponent(item.type, item.props)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default EditCanvas;
