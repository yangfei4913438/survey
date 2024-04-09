import { FC } from 'react';

import { getComponentConfByType } from '@/components/EditorComponents';
import useSurveyEditor from '@/store/hooks/useSurveyEditor';

const NoProp: FC = () => <div className='text-center'>未选中任何组件</div>;

const ComponentProps = () => {
  const { selectedComponent, changeComponentProps } = useSurveyEditor();
  if (!selectedComponent) return <NoProp />;

  const { type, props, fe_id, locked } = selectedComponent;
  const conf = getComponentConfByType(type);
  if (!conf) return <NoProp />;

  const changeProps = (newProps: EditorComponentsPropsType) => {
    changeComponentProps(fe_id, newProps);
  };

  const { PropComponent } = conf;
  return (
    <div className='h-full w-full overflow-auto'>
      <PropComponent {...props} onChange={changeProps} disabled={locked} />
    </div>
  );
};

export default ComponentProps;
