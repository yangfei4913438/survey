import { FC } from 'react';

import EditorInputConf from './EditorInput';
import EditorTitleConf from './EditorTitle';

// 统一的组件配置类型
export type EditorComponentConfType = {
  title: string;
  type: EditorComponentTypes;
  Component: FC<EditorComponentsPropsType>;
  PropComponent: FC<EditorComponentsPropsType>;
  defaultProps: EditorComponentsPropsType;
};

// 全部的组件配置列表
const editorComponentsConfList: EditorComponentConfType[] = [EditorInputConf, EditorTitleConf];

// 组件分组
export const componentConfGroup = [
  {
    groupId: 'G001',
    groupName: '文本显示',
    components: [EditorTitleConf],
  },
  {
    groupId: 'G002',
    groupName: '用户输入',
    components: [EditorInputConf],
  },
];

// 根据组件类型，查询组件配置
export const getComponentConfByType = (type: EditorComponentTypes) => {
  return editorComponentsConfList.find((comp) => comp.type === type);
};
