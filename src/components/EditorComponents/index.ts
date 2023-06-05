import { FC } from 'react';

import EditorInputConf from './EditorInput';
import EditorTitleConf from './EditorTitle';

// 统一的组件配置类型
export type EditorComponentConfType = {
  title: string;
  type: EditorComponentTypes;
  Component: FC<EditorComponentsPropsType>;
  defaultProps: EditorComponentsPropsType;
};

// 全部的组件配置列表
const editorComponentsConfList: EditorComponentConfType[] = [EditorInputConf, EditorTitleConf];

// 根据组件类型，查询组件配置
export const getComponentConfByType = (type: EditorComponentTypes) => {
  return editorComponentsConfList.find((comp) => comp.type === type);
};
