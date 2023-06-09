import cls from 'classnames';
import React, { FC } from 'react';

import { getComponentConfByType } from '@/components/EditorComponents';
import useSurveyEditor from '@/hooks/useSurveyEditor';

type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};

const ComponentList: FC<PropsType> = ({
  selectedComponentId,
  setSelectedComponentId,
  setSelectedComponentType,
}) => {
  const { visibleComponentList } = useSurveyEditor();

  const handleClick = (id: string, type: SurveyEditorComponentType) => {
    setSelectedComponentId(id);
    setSelectedComponentType(type);
  };

  return (
    <div
      className={
        'box-content max-h-full w-90 space-y-2 overflow-auto rounded bg-white px-3 py-4 shadow hover:shadow-md'
      }
    >
      {visibleComponentList.map((c) => {
        const { fe_id, props, type } = c;

        const componentConf = getComponentConfByType(type);
        if (componentConf == null) return null;

        const { Component } = componentConf;

        return (
          <div
            className={cls(
              'cursor-pointer rounded p-3 border-solid border hover:border-sky-500 ',
              selectedComponentId === fe_id ? ' border-slate-300' : 'border-white'
            )}
            key={fe_id}
            onClick={() => handleClick(fe_id, type)}
          >
            <div className={'pointer-events-none'}>
              <Component {...props} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ComponentList;
