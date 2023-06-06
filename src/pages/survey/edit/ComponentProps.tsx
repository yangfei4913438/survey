import { FC } from 'react';

import { getComponentConfByType } from '@/components/EditorComponents';
import useEditorComponents from '@/hooks/useEditorComponents';

const NoProp: FC = () => <div className='text-center'>未选中任何组件</div>;

const ComponentProps = () => {
  const { selectedComponent, changeComponentProps } = useEditorComponents();
  if (!selectedComponent) return <NoProp />;

  const { type, props, fe_id, locked } = selectedComponent;
  const conf = getComponentConfByType(type);
  if (!conf) return <NoProp />;

  const changeProps = (newProps: EditorComponentsPropsType) => {
    console.log('newProps:', newProps, fe_id);
    changeComponentProps(fe_id, newProps);
  };

  const { PropComponent } = conf;
  return <PropComponent {...props} onChange={changeProps} disabled={locked} />;
};

export default ComponentProps;
