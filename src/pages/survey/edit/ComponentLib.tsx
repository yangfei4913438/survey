import { Typography } from 'antd';
import { nanoid } from 'nanoid';

import { componentConfGroup, EditorComponentConfType } from '@/components/EditorComponents';
import useSurveyEditor from '@/hooks/useSurveyEditor';

const ComponentLib = () => {
  const { addComponent } = useSurveyEditor();

  // 渲染默认配置的组件
  const renderComponent = (conf: EditorComponentConfType) => {
    const { Component, defaultProps, type, title } = conf;

    // 点击插入到编辑区域
    const handleClick = () => {
      // 添加新组件
      addComponent({
        fe_id: nanoid(), // 这里其实是新创建一个组件，不是把组件库里的通用组件拿进去。。。
        title,
        type,
        visible: true,
        locked: false,
        props: defaultProps,
      });
    };

    return (
      <div
        className='cursor-pointer rounded border border-solid border-slate-300 p-3 hover:border-sky-500'
        onClick={handleClick}
        key={conf.type} // 类型是不会重复的
      >
        <div className='pointer-events-none'>
          <Component {...defaultProps} />
        </div>
      </div>
    );
  };

  return (
    <div className='space-y-4'>
      {componentConfGroup.map((group, idx) => {
        return (
          <div className='space-y-3' key={group.groupId}>
            <Typography.Title level={3}>{group.groupName}</Typography.Title>
            <div className='space-y-2'>{group.components.map((conf) => renderComponent(conf))}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ComponentLib;
