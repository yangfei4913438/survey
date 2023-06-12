import cls from 'classnames';
import React, { FC } from 'react';

import { getComponentConfByType } from '@/components/EditorComponents';
import { interoperableTypes } from '@/consts/editorComponent';
import useSurveyEditor from '@/hooks/store/useSurveyEditor';

const ComponentList: FC = () => {
  const { visibleComponentList, changeSelectedId, selectedComponent } = useSurveyEditor();

  const handleClick = (id: string, type: SurveyEditorComponentType) => {
    if (interoperableTypes.includes(type)) {
      changeSelectedId(id);
    }
  };

  return (
    <div className={'space-y-2 '}>
      {visibleComponentList.map((c) => {
        const { fe_id, props, type } = c;

        const componentConf = getComponentConfByType(type);
        if (componentConf == null) return null;

        const { Component } = componentConf;

        return (
          <div
            className={cls(
              'rounded p-3 border-solid border opacity-80',
              interoperableTypes.includes(type) && selectedComponent?.fe_id === fe_id
                ? ' border-sky-300'
                : 'border-white',
              interoperableTypes.includes(type) ? 'cursor-pointer hover:border-sky-500' : ''
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
